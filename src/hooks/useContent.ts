import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type ContentPage = string;
export type ContentSection = string;
export type ContentMap = Record<ContentSection, string>;
export type ContentBlock = Pick<Tables<"content_blocks">, "page" | "section" | "value">;

type ContentListener = (page: ContentPage) => void;

const contentCache = new Map<ContentPage, ContentMap>();
const listeners = new Set<ContentListener>();

const rowsToContentMap = (rows: ContentBlock[] | null): ContentMap => {
  return (rows ?? []).reduce<ContentMap>((map, row) => {
    if (row.section && row.value !== null) {
      map[row.section] = row.value;
    }

    return map;
  }, {});
};

const fetchContentPage = async (page: ContentPage): Promise<ContentMap> => {
  const { data, error } = await supabase
    .from("content_blocks")
    .select("page,section,value")
    .eq("page", page);

  if (error) {
    throw error;
  }

  const content = rowsToContentMap(data);
  contentCache.set(page, content);
  return content;
};

export const invalidateContent = (page?: ContentPage) => {
  if (page) {
    contentCache.delete(page);
  } else {
    contentCache.clear();
  }

  listeners.forEach((listener) => listener(page ?? "*"));
};

export const useContent = (page: ContentPage) => {
  const [content, setContent] = useState<ContentMap>(() => contentCache.get(page) ?? {});
  const [loading, setLoading] = useState(() => !contentCache.has(page));
  const [error, setError] = useState<Error | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const listener: ContentListener = (changedPage) => {
      if (changedPage === page || changedPage === "*") {
        setRefreshKey((key) => key + 1);
      }
    };

    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, [page]);

  useEffect(() => {
    let mounted = true;
    const cached = contentCache.get(page);

    if (cached && refreshKey === 0) {
      setContent(cached);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);

    fetchContentPage(page)
      .then((freshContent) => {
        if (!mounted) return;
        setContent(freshContent);
        setError(null);
      })
      .catch((fetchError: Error) => {
        if (!mounted) return;
        setError(fetchError);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [page, refreshKey]);

  const getContent = useCallback(
    (sectionKey: ContentSection, defaultValue = "") => {
      const value = content[sectionKey];
      return value === undefined || value === null || value === "" ? defaultValue : value;
    },
    [content],
  );

  return useMemo(
    () => ({
      content,
      data: content,
      error,
      get: getContent,
      getContent,
      loading,
    }),
    [content, error, getContent, loading],
  );
};
