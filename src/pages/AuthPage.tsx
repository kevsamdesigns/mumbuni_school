import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { StudentSignupForm } from '@/components/auth/StudentSignupForm';
import { TeacherSignupForm } from '@/components/auth/TeacherSignupForm';

// Validation Schemas
const studentLoginSchema = z.object({
  admission_no: z.string().min(3, 'Admission number required'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const teacherLoginSchema = z.object({
  identity: z.string().min(3, 'Staff ID/Email required'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const adminLoginSchema = z.object({
  identity: z.string().email('Valid email required'), 
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type AuthMode = 'login' | 'signup';
type UserType = 'student' | 'teacher' | 'admin';

export function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [userType, setUserType] = useState<UserType>('student');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 bg-white rounded-xl shadow-xl overflow-hidden min-h-[600px]">
          {/* Left Branding Panel */}
          <div className="bg-gradient-to-b from-red-700 to-red-900 p-8 flex flex-col justify-center items-center text-white">
            <img src="/logo.png" alt="School Logo" className="w-32 h-32 mb-4"/>
            <h1 className="text-3xl font-bold text-center">Mumbuni Boys Senior School</h1>
            <p className="text-yellow-300 italic mt-2">"Together We Excel"</p>
            <div className="mt-8 text-center">
              <p className="text-lg">Welcome to our portal</p>
              <p className="text-sm mt-2">Login to access your account</p>
            </div>
          </div>

          {/* Right Auth Panel */}
          <div className="p-8">
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student" onClick={() => setUserType('student')}>
                  Student
                </TabsTrigger>
                <TabsTrigger value="teacher" onClick={() => setUserType('teacher')}>
                  Teacher
                </TabsTrigger>
                <TabsTrigger value="admin" onClick={() => setUserType('admin')}>
                  Admin
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <div className="flex gap-4 mb-6">
                  <Button
                    variant={authMode === 'login' ? 'default' : 'outline'}
                    onClick={() => setAuthMode('login')}
                  >
                    Login
                  </Button>
                  <Button
                    variant={authMode === 'signup' ? 'default' : 'outline'}
                    onClick={() => setAuthMode('signup')}
                    disabled={userType === 'admin'}
                  >
                    Sign Up
                  </Button>
                </div>

                <div className="space-y-4">
                  {authMode === 'login' ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="username">
                          {userType === 'student' ? 'Admission Number' : userType === 'teacher' ? 'Staff Number/Email' : 'Admin Email'}
                        </Label>
                        <Input 
                          id="username" 
                          type="text" 
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
                            className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700"
                            required
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 px-2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? 'Hide' : 'Show'}
                          </Button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                    </>
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