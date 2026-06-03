import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type Role = "admin" | "student" | "teacher";

interface AuthState {
  user: User | null;
  session: Session | null;
  roles: Role[];
  loading: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  isTeacher: boolean;
  signOut: () => Promise<void>;
  refreshRoles: () => Promise<Role | undefined>;
  debugRoles?: () => void;
}

const Ctx = createContext<AuthState | undefined>(undefined);

const stringifyError = (err: unknown) =>
  JSON.stringify(
    err instanceof Error
      ? { name: err.name, message: err.message, stack: err.stack }
      : err,
    null,
    2
  );

const timeoutAfter = (message: string, ms: number) =>
  new Promise<never>((_, reject) =>
    window.setTimeout(() => reject(new Error(message)), ms)
  );

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRoles = async (uid: string) => {
    try {
      console.log("Entering loadRoles for user:", uid);
      console.log("Loading profile for:", uid);
      console.log("Skipping claim_admin_invite RPC");
      console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);

      console.log("About to run profiles test query");
      const test = await Promise.race([
        supabase
          .from("profiles")
          .select("user_id, role")
          .limit(1),
        timeoutAfter("Profiles test query timeout", 10000),
      ]);
      console.log("Test query:", test);
      
      console.log("About to query profiles");
      const result = await Promise.race([
        supabase
          .from("profiles")
          .select("*")
          .eq("user_id", uid)
          .single(),
        timeoutAfter("Profile query timeout", 10000),
      ]);
      console.log("Profile query returned");

      const { data, error } = result;
      
      console.log("Profile query uid:", uid);
      console.log("Profile query data:", data);
      console.log("Profile query error:", error ? stringifyError(error) : null);
      console.log("Profile error code:", error?.code);
      console.log("Profile error message:", error?.message);
      console.log("Profile error details:", error?.details);
      console.log("Profile error hint:", error?.hint);
      
      if (error) {
        console.error("Profile query failed:", stringifyError(error));
        setRoles([]);
        return;
      }
      
      if (!data) {
        console.warn("No profile data found for user:", uid);
        setRoles([]);
        return;
      }
      
      const role = data.role as Role;
      console.log("Roles loaded:", role);
      setRoles([role]);
      
      return role;
    } catch (err) {
      console.error("loadRoles exception:", stringifyError(err));
      setRoles([]);
      return;
    } finally {
      console.log("loadRoles completed");
    }
  };

  useEffect(() => {
    console.log("AuthProvider mounted");
    const loadingTimeouts: number[] = [];
    const forceLoadingFalseAfterDelay = () => {
      const timeout = window.setTimeout(() => {
        console.warn("Auth loading timeout reached; forcing loading false");
        setLoading(false);
      }, 5000);

      loadingTimeouts.push(timeout);
      return timeout;
    };

    const initialLoadingTimeout = forceLoadingFalseAfterDelay();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, s) => {
      const authLoadingTimeout = forceLoadingFalseAfterDelay();
      console.log("Auth state changed - loading start");
      console.log("Session:", s);
      console.log("User:", s?.user);
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(true);
      if (s?.user) {
        try {
          await loadRoles(s.user.id);
        } catch (e) {
          console.error("Error loading roles:", stringifyError(e));
        } finally {
          window.clearTimeout(authLoadingTimeout);
          setLoading(false);
          console.log("Auth state changed - loading end");
          console.log("Loading false reached");
        }
      } else {
        window.clearTimeout(authLoadingTimeout);
        setRoles([]);
        setLoading(false);
        console.log("Auth state changed - loading end (no user)");
      }
    });

    const sessionLoadingTimeout = forceLoadingFalseAfterDelay();

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        try {
          await loadRoles(session.user.id);
        } catch (e) {
          console.error("Session load error:", stringifyError(e));
        } finally {
          window.clearTimeout(sessionLoadingTimeout);
          window.clearTimeout(initialLoadingTimeout);
          setLoading(false);
        }
      } else {
        window.clearTimeout(sessionLoadingTimeout);
        window.clearTimeout(initialLoadingTimeout);
        setLoading(false);
      }
    });

    return () => {
      loadingTimeouts.forEach((timeout) => window.clearTimeout(timeout));
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <Ctx.Provider
      value={{
        user,
        session,
        roles,
        loading,
        isAdmin: roles.includes("admin"),
        debugRoles: () => {
          console.log("Current roles:", roles);
          console.log("isAdmin:", roles.includes("admin"));
        },
        isStudent: roles.includes("student"),
        isTeacher: roles.includes("teacher"),
        signOut: async () => {
          console.log("Signing out");
          setRoles([]);
          setUser(null);
          setSession(null);
          setLoading(false);

          const { error } = await supabase.auth.signOut();
          if (error) {
            console.error("Sign out failed:", stringifyError(error));
          }
        },
        refreshRoles: async () => {
          const currentUser = user ?? (await supabase.auth.getUser()).data.user;
          if (currentUser) return loadRoles(currentUser.id);
          return undefined;
        },
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
