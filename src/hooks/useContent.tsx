import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type ContentMap = Record<string, string>;
const cache = new Map<string, ContentMap>();
const listeners = new Set<() => void>();

export const useContent = (page: string, defaults: Record<string, string> = {}) => {
  const [data, setData] = useState<ContentMap>(cache.get(page) ?? {});

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: rows } = await supabase.from("content_blocks").select("section,value").eq("page", page);
      if (!mounted) return;
      const map: ContentMap = {};
      (rows ?? []).forEach((r: any) => { if (r.value !== null) map[r.section] = r.value; });
      cache.set(page, map);
      setData(map);
    })();
    const cb = () => setData({ ...(cache.get(page) ?? {}) });
    listeners.add(cb);
    return () => { mounted = false; listeners.delete(cb); };
  }, [page]);

  const get = (section: string) => data[section] ?? defaults[section] ?? "";
  return { get, data };
};

export const invalidateContent = (page: string) => {
  cache.delete(page);
  listeners.forEach((cb) => cb());
};
