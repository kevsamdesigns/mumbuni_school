import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function TeacherSignupForm() {
  const [formData, setFormData] = useState({
    staff_no: '',
    full_name: '',
    national_id: '',
    tsc_no: '',
    gender: '',
    date_of_birth: '',
    phone: '',
    email: '',
    department: '',
    subject1: '',
    subject2: '',
    qualification: '',
    employment_type: '',
    date_joined: '',
    address: '',
    emergency_contact: '',
    password: '',
    confirm_password: ''
  });
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPassportPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // Upload passport photo if exists
      let photoUrl = '';
      if (passportPhoto) {
        const fileExt = passportPhoto.name.split('.').pop();
        const fileName = `${authData.user?.id}-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('teacher-photos')
          .upload(fileName, passportPhoto);

        if (uploadError) throw uploadError;

        photoUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/teacher-photos/${fileName}`;
      }

      // Create teacher profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          user_id: authData.user?.id,
          role: 'teacher',
          staff_no: formData.staff_no,
          full_name: formData.full_name,
          national_id: formData.national_id,
          tsc_no: formData.tsc_no,
          gender: formData.gender,
          date_of_birth: formData.date_of_birth,
          phone: formData.phone,
          email: formData.email,
          department: formData.department,
          subject1: formData.subject1,
          subject2: formData.subject2,
          qualification: formData.qualification,
          employment_type: formData.employment_type,
          date_joined: formData.date_joined,
          address: formData.address,
          emergency_contact: formData.emergency_contact,
          passport_photo: photoUrl,
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
      <h2 className="text-xl font-bold">Teacher Registration</h2>
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">Registration successful! Awaiting admin approval.</div>}
      
      <div className="space-y-2">
        <Label>Staff Number*</Label>
        <Input
          type="text"
          name="staff_no"
          value={formData.staff_no}
          onChange={handleChange}
          placeholder="Enter staff number"
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
        <Label>National ID*</Label>
        <Input
          type="text"
          name="national_id"
          value={formData.national_id}
          onChange={handleChange}
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>TSC Number*</Label>
        <Input
          type="text"
          name="tsc_no"
          value={formData.tsc_no}
          onChange={handleChange}
          placeholder="Enter TSC number"
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
        <Label>Date of Birth</Label>
        <Input 
          type="date" 
          name="date_of_birth" 
          value={formData.date_of_birth} 
          onChange={handleChange} 
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
        />
      </div>

      <div className="space-y-2">
        <Label>Phone Number*</Label>
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Email*</Label>
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
        <Label>Department*</Label>
        <Input 
          type="text" 
          name="department" 
          value={formData.department} 
          onChange={handleChange} 
          placeholder="Enter department"
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
          required 
        />
      </div>

      <div className="space-y-2">
        <Label>Subject 1*</Label>
        <Input 
          type="text" 
          name="subject1" 
          value={formData.subject1} 
          onChange={handleChange} 
          placeholder="Enter first subject"
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
          required 
        />
      </div>

      <div className="space-y-2">
        <Label>Subject 2</Label>
        <Input 
          type="text" 
          name="subject2" 
          value={formData.subject2} 
          onChange={handleChange} 
          placeholder="Enter second subject"
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
        />
      </div>

      <div className="space-y-2">
        <Label>Qualification*</Label>
        <Input 
          type="text" 
          name="qualification" 
          value={formData.qualification} 
          onChange={handleChange} 
          placeholder="Enter qualification"
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
          required 
        />
      </div>

      <div className="space-y-2">
        <Label>Employment Type*</Label>
        <select 
          name="employment_type" 
          value={formData.employment_type} 
          onChange={handleSelectChange}
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
          required
        >
          <option value="">Select Type</option>
          <option value="permanent">Permanent</option>
          <option value="contract">Contract</option>
          <option value="part-time">Part-Time</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Date Joined</Label>
        <Input 
          type="date" 
          name="date_joined" 
          value={formData.date_joined} 
          onChange={handleChange} 
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
        />
      </div>

      <div className="space-y-2">
        <Label>Address</Label>
        <Input 
          type="text" 
          name="address" 
          value={formData.address} 
          onChange={handleChange} 
          placeholder="Enter address"
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
        />
      </div>

      <div className="space-y-2">
        <Label>Emergency Contact</Label>
        <Input 
          type="text" 
          name="emergency_contact" 
          value={formData.emergency_contact} 
          onChange={handleChange} 
          placeholder="Enter emergency contact"
          className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 bg-white text-black focus:border-red-700 focus:ring-2 focus:ring-red-200"
        />
      </div>

      <div className="space-y-2">
        <Label>Passport Photo</Label>
        <Input 
          type="file" 
          accept="image/*" 
          onChange={handlePhotoUpload} 
          className="w-full h-auto border-2 border-gray-300 rounded-lg px-4 py-3 bg-white text-black file:mr-4 file:rounded-md file:border-0 file:bg-red-700 file:px-4 file:py-2 file:text-white hover:file:bg-red-800 focus:border-red-700 focus:ring-2 focus:ring-red-200"
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
