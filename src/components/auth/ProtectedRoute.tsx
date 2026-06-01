import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/integrations/supabase/client';

type ProtectedRouteProps = {
  children: React.ReactNode;
  role?: UserRole;
  requireStudent?: boolean;
  requireTeacher?: boolean; 
  requireAdmin?: boolean;
};

export function ProtectedRoute({
  children,
  role,
  requireStudent,
  requireTeacher,
  requireAdmin
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      const hasRequiredRole = 
        (requireStudent && user.role === 'student') ||
        (requireTeacher && user.role === 'teacher') ||
        (requireAdmin && user.role === 'admin') ||
        (role && user.role === role);

      if (!hasRequiredRole) {
        switch (user.role) {
          case UserRole.Student:
            navigate('/portal');
            break;
          case UserRole.Teacher:
            navigate('/teacher');
            break;
          case UserRole.Admin:
            navigate('/admin');
            break;
          default:
            navigate('/');
        }
      }
    }
  }, [user, loading, navigate, role, requireStudent, requireTeacher, requireAdmin]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  const hasRequiredRole =
    (requireStudent && user.role === 'student') ||
    (requireTeacher && user.role === 'teacher') ||
    (requireAdmin && user.role === 'admin') ||
    (role && user.role === role);

  if (!hasRequiredRole) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}