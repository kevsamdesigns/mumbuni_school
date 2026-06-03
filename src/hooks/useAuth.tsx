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
  refreshRoles: () => Promise<void>;
  debugRoles?: () => void;
}

const Ctx = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRoles = async (uid: string) => {
    console.log("Entering loadRoles for user:", uid);
    
    try {
      console.log("Skipping claim_admin_invite RPC");
      
      const { data, error } = await supabase
        .from("profiles")
        .select<"role", { role: string }>("role")
        .eq("user_id", uid)
        .maybeSingle();
      
      console.log("Profile query result:", data);
      console.log("Profile query error:", error);
      
      if (error) {
        console.error("Failed to load profile:", error);
        throw error;
      }
      
      if (!data) {
        console.warn("No profile data found for user:", uid);
        setRoles([]);
        return undefined;
      }
      
      const role = data.role as Role;
      console.log("Roles loaded:", role);
      setRoles([role]);
      
      return role;
    } catch (e) {
      console.error("Error in loadRoles:", e);
      throw e;
    }
  };

  useEffect(() => {
    console.log("AuthProvider mounted");
    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, s) => {
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
          console.error("Error loading roles:", e);
        } finally {
          setLoading(false);
          console.log("Auth state changed - loading end");
          console.log("Loading false reached");
        }
      } else {
        setRoles([]);
        setLoading(false);
        console.log("Auth state changed - loading end (no user)");
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        try {
          await loadRoles(session.user.id);
        } catch (e) {
          console.error("Session load error:", e);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => sub.subscription.unsubscribe();
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
          await supabase.auth.signOut();
        },
        refreshRoles: async () => {
          const currentUser = user ?? (await supabase.auth.getUser()).data.user;
          if (currentUser) await loadRoles(currentUser.id);
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
