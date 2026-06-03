import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { StudentSignupForm } from '@/components/auth/StudentSignupForm';
import { TeacherSignupForm } from '@/components/auth/TeacherSignupForm';
import { generateStudentEmail, supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import logo from '@/assets/mumbuni-logo.png';

type AuthMode = 'login' | 'signup';
type UserType = 'student' | 'teacher' | 'admin';

export function AuthPage() {
  const navigate = useNavigate();
  const { refreshRoles } = useAuth();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [userType, setUserType] = useState<UserType>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const clearLoginDetails = () => {
    setUsername('');
    setPassword('');
    setShowPassword(false);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedUsername = username.trim();
    if (!trimmedUsername || !password) {
      toast.error('Enter your login details');
      return;
    }

    const email = userType === 'student'
      ? generateStudentEmail(trimmedUsername)
      : trimmedUsername.toLowerCase();

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoading(false);
      clearLoginDetails();
      toast.error(error.message);
      return;
    }

    await refreshRoles();
    setLoading(false);
    clearLoginDetails();
    toast.success('Welcome back');

    if (userType === 'admin') navigate('/admin-dashboard', { replace: true });
    else if (userType === 'teacher') navigate('/teacher-dashboard', { replace: true });
    else navigate('/student-portal', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 bg-white rounded-xl shadow-xl overflow-hidden min-h-[600px]">
          {/* Left Branding Panel */}
          <div className="bg-gradient-to-b from-red-700 to-red-900 p-8 flex flex-col justify-center items-center text-white">
            <img
              src={logo}
              alt="Mumbuni Boys Senior School logo"
              className="w-32 h-32 mb-4 rounded-xl bg-white object-contain p-2 shadow-lg"
            />
            <h1 className="text-3xl font-bold text-center">Mumbuni Boys Senior School</h1>
            <p className="text-yellow-300 italic mt-2">"Together We Excel"</p>
            <div className="mt-8 text-center">
              <p className="text-lg">Welcome to our portal</p>
              <p className="text-sm mt-2">Login to access your account</p>
            </div>
          </div>

          {/* Right Auth Panel */}
          <div className="p-8">
            <Tabs
              value={userType}
              onValueChange={(value) => {
                const nextUserType = value as UserType;
                setUserType(nextUserType);
                clearLoginDetails();
                if (nextUserType === 'admin') setAuthMode('login');
              }}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student" className="transition-all duration-150 ease-out">
                  Student
                </TabsTrigger>
                <TabsTrigger value="teacher" className="transition-all duration-150 ease-out">
                  Teacher
                </TabsTrigger>
                <TabsTrigger value="admin" className="transition-all duration-150 ease-out">
                  Admin
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <div className="flex gap-4 mb-6">
                  <Button
                    variant={authMode === 'login' ? 'default' : 'outline'}
                    onClick={() => {
                      setAuthMode('login');
                      clearLoginDetails();
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant={authMode === 'signup' ? 'default' : 'outline'}
                    onClick={() => {
                      setAuthMode('signup');
                      clearLoginDetails();
                    }}
                    disabled={userType === 'admin'}
                  >
                    Sign Up
                  </Button>
                </div>

                <div
                  key={`${userType}-${authMode}`}
                  className="space-y-4 animate-in fade-in-0 slide-in-from-right-1 duration-150 ease-out"
                >
                  {authMode === 'login' ? (
                    <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
                      <div className="space-y-2">
                        <Label htmlFor="username">
                          {userType === 'student' ? 'Admission Number' : userType === 'teacher' ? 'Staff Number/Email' : 'Admin Email'}
                        </Label>
                        <Input 
                          id="username" 
                          type="text" 
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                          autoComplete="off"
                          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700"
                          required 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="off"
                            className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700"
                            required
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 px-2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? 'Hide' : 'Show'}
                          </Button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      {userType === 'student' ? (
                        <StudentSignupForm />
                      ) : (
                        <TeacherSignupForm />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
