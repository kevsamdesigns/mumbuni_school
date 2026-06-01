BEGIN;

CREATE TABLE content_blocks (
  id SERIAL PRIMARY KEY,
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(), 
  created_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_content_blocks_page ON content_blocks (page);
CREATE INDEX idx_content_blocks_section ON content_blocks (section);

ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" 
ON content_blocks FOR SELECT USING (true);

CREATE POLICY "Enable admin full access"
ON content_blocks FOR ALL USING (auth.role() = 'admin');

COMMIT;