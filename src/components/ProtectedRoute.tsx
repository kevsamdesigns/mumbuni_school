import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireStudent?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin, requireStudent }: Props) => {
  const { user, loading, isAdmin, isStudent } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/" replace />;
  if (requireStudent && !isStudent && !isAdmin) return <Navigate to="/" replace />;

  return <>{children}</>;
};
