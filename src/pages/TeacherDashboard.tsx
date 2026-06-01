import { useAuth } from "@/hooks/useAuth";

export function TeacherDashboard() {
  const { user } = useAuth();
  
  return (
    <div className="teacher-dashboard">
      <h1>Teacher Dashboard</h1>
      <p>Welcome, {user?.full_name || 'Teacher'}</p>
      {/* Teacher-specific content will go here */}
    </div>
  );
}