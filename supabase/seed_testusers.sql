-- Test Users for Verification
BEGIN;

-- Admin Test User (pre-approved)
INSERT INTO auth.users (id, email, encrypted_password) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'admin@test.local',
  crypt('admin123', gen_salt('bf'))
);

INSERT INTO profiles (user_id, role, full_name, approved) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'admin',
  'Test Admin',
  true
);

-- Teacher Test User (approved)
INSERT INTO auth.users (id, email, encrypted_password) VALUES (
  '22222222-2222-2222-2222-222222222222',
  'teacher@test.local',
  crypt('teacher123', gen_salt('bf'))
);

INSERT INTO profiles (
  user_id, role, staff_no, full_name, 
  department, approved
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  'teacher',
  'T1001',
  'Test Teacher',
  'Math',
  true
);

-- Student Test User (approved)
INSERT INTO auth.users (id, email, encrypted_password) VALUES (
  '33333333-3333-3333-3333-333333333333',
  'MBS2024001@student.local', -- Auto-generated email
  crypt('student123', gen_salt('bf')) 
);

INSERT INTO profiles (
  user_id, role, admission_no, full_name,
  form, stream, approved
) VALUES (
  '33333333-3333-3333-3333-333333333333',
  'student',
  'MBS2024001',
  'Test Student',
  '4',
  'North',
  true
);

COMMIT;

-- Verification Queries
SELECT * FROM auth.users WHERE email LIKE '%test.local%';
SELECT * FROM profiles WHERE user_id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',  
  '33333333-3333-3333-3333-333333333333'
);