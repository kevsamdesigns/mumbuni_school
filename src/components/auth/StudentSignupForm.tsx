import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function StudentSignupForm() {
  const [formData, setFormData] = useState({
    admission_no: '',
    email: '',
    full_name: '',
    form: '',
    stream: '',
    gender: '',
    parent_name: '',
    parent_phone: '',
    kcpe_index: '',
    kcpe_assessment: '',
    password: '',
    confirm_password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const email = formData.email.trim().toLowerCase();
      
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: formData.password,
      });

      if (authError) throw authError;

      // Create student profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          user_id: authData.user?.id,
          role: 'student',
          admission_no: formData.admission_no,
          full_name: formData.full_name,
          email,
          form: formData.form,
          stream: formData.stream,
          gender: formData.gender,
          parent_name: formData.parent_name,
          parent_phone: formData.parent_phone,
          kcpe_index: formData.kcpe_index,
          approved: false
        }]);

      if (profileError) throw profileError;
      
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Student Registration</h2>
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">Registration successful! Awaiting admin approval.</div>}
      
      <div className="space-y-2">
        <Label>Admission Number*</Label>
        <Input
          type="text"
          name="admission_no"
          value={formData.admission_no}
          onChange={handleChange}
          placeholder="Enter admission number"
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Email Address*</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Full Name*</Label>
        <Input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Enter full name"
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Form/Class*</Label>
        <select 
          name="form" 
          value={formData.form} 
          onChange={handleSelectChange} 
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
          required
        >
          <option value="">Select Form</option>
          <option value="1">Form 1</option>
          <option value="2">Form 2</option>
          <option value="3">Form 3</option>
          <option value="4">Form 4</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Stream*</Label>
        <Input
          type="text"
          name="stream"
          value={formData.stream}
          onChange={handleChange}
          placeholder="Enter stream name"
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Gender</Label>
        <select 
          name="gender" 
          value={formData.gender} 
          onChange={handleSelectChange}
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Parent/Guardian Name*</Label>
        <Input
          type="text"
          name="parent_name"
          value={formData.parent_name}
          onChange={handleChange}
          placeholder="Enter parent/guardian name"
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Parent Phone Number</Label>
        <Input 
          type="tel" 
          name="parent_phone" 
          value={formData.parent_phone} 
          onChange={handleChange} 
          placeholder="Enter parent phone number"
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
        />
      </div>

      <div className="space-y-2">
        <Label>KCPE Index Number</Label>
        <Input 
          type="text" 
          name="kcpe_index" 
          value={formData.kcpe_index} 
          onChange={handleChange} 
          placeholder="Enter KCPE index number"
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
        />
      </div>

      <div className="space-y-2">
        <Label>Password*</Label>
        <Input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          placeholder="Enter password"
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
          required 
        />
      </div>

      <div className="space-y-2">
        <Label>Confirm Password*</Label>
        <Input 
          type="password" 
          name="confirm_password" 
          value={formData.confirm_password} 
          onChange={handleChange} 
          placeholder="Confirm password"
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
          required 
        />
      </div>

      <Button type="submit" className="w-full h-12" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
}
