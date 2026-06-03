import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireStudent?: boolean;
  requireTeacher?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin, requireStudent, requireTeacher }: Props) => {
  const { user, loading, isAdmin, isStudent, isTeacher } = useAuth();
  const location = useLocation();

  const denied = (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-2">
        <h1 className="text-xl font-semibold text-primary-deep">Account role unavailable</h1>
        <p className="text-sm text-muted-foreground">
          Your account role could not be loaded. Please sign out and try again, or contact the school admin.
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />;
  if (requireAdmin && !isAdmin) return denied;
  if (requireStudent && !isStudent && !isAdmin) return denied;
  if (requireTeacher && !isTeacher && !isAdmin) return denied;

  return <>{children}</>;
};
