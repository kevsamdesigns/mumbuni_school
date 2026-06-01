import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

        photoUrl = `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/teacher-photos/${fileName}`;
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
      setError(err.message);
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

      <div>
        <label>Gender</label>
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

      <div>
        <label>Date of Birth</label>
        <input 
          type="date" 
          name="date_of_birth" 
          value={formData.date_of_birth} 
          onChange={handleChange} 
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

      <div>
        <label>Email*</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label>Department*</label>
        <input 
          type="text" 
          name="department" 
          value={formData.department} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label>Subject 1*</label>
        <input 
          type="text" 
          name="subject1" 
          value={formData.subject1} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label>Subject 2</label>
        <input 
          type="text" 
          name="subject2" 
          value={formData.subject2} 
          onChange={handleChange} 
        />
      </div>

      <div>
        <label>Qualification*</label>
        <input 
          type="text" 
          name="qualification" 
          value={formData.qualification} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label>Employment Type*</label>
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

      <div>
        <label>Date Joined</label>
        <input 
          type="date" 
          name="date_joined" 
          value={formData.date_joined} 
          onChange={handleChange} 
        />
      </div>

      <div>
        <label>Address</label>
        <input 
          type="text" 
          name="address" 
          value={formData.address} 
          onChange={handleChange} 
        />
      </div>

      <div>
        <label>Emergency Contact</label>
        <input 
          type="text" 
          name="emergency_contact" 
          value={formData.emergency_contact} 
          onChange={handleChange} 
        />
      </div>

      <div>
        <label>Passport Photo</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handlePhotoUpload} 
        />
      </div>

      <div>
        <label>Password*</label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label>Confirm Password*</label>
        <input 
          type="password" 
          name="confirm_password" 
          value={formData.confirm_password} 
          onChange={handleChange} 
          required 
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}