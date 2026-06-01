BEGIN;

-- Enable RLS if not already enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Students can view their own profile
CREATE POLICY "Students can view own profile" 
ON profiles FOR SELECT
USING (
  auth.uid() = user_id AND 
  role = 'student'
);

-- Teachers can view their own profile  
CREATE POLICY "Teachers can view own profile"
ON profiles FOR SELECT
USING (
  auth.uid() = user_id AND
  role = 'teacher'
);

-- Admins have full access
CREATE POLICY "Enable admin full access"
ON profiles FOR ALL
USING (auth.role() = 'admin');

-- Allow approved teachers to view student profiles (for class management)
CREATE POLICY "Teachers can view student profiles"
ON profiles FOR SELECT
USING (
  auth.role() = 'teacher' AND 
  role = 'student' AND
  (SELECT approved FROM profiles WHERE user_id = auth.uid())
);

COMMIT;