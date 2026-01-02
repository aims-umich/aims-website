-- Admin Allowlist
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News Items
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  link TEXT,
  date TEXT NOT NULL,
  timestamp BIGINT NOT NULL,
  image_url TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  category TEXT CHECK (category IN ('reactors', 'controls', 'computing', 'general')),
  featured BOOLEAN DEFAULT FALSE,
  author TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Members
CREATE TABLE members (
  id TEXT PRIMARY KEY, -- Using their unique ID (e.g., 'jeremoon')
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL,
  role TEXT NOT NULL,
  joined_date TEXT NOT NULL,
  image_url TEXT NOT NULL,
  hero_image_url TEXT,
  bio TEXT,
  interests TEXT[] DEFAULT '{}',
  education TEXT[] DEFAULT '{}',
  degrees TEXT[] DEFAULT '{}',
  department TEXT NOT NULL,
  linkedin TEXT,
  website TEXT,
  slug TEXT UNIQUE NOT NULL,
  projects JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Research Items
CREATE TABLE research (
  id TEXT PRIMARY KEY, -- e.g., 'reactors-1'
  type TEXT CHECK (type IN ('publication', 'project')) NOT NULL,
  title TEXT NOT NULL,
  group_name TEXT CHECK (group_name IN ('reactors', 'controls', 'computing')) NOT NULL,
  image_url TEXT NOT NULL,
  is_recent BOOLEAN DEFAULT FALSE,
  authors TEXT[] DEFAULT '{}',
  journal TEXT,
  year INTEGER,
  timestamp BIGINT NOT NULL,
  abstract TEXT,
  keywords TEXT[] DEFAULT '{}',
  doi TEXT,
  pdf_url TEXT,
  description TEXT,
  status TEXT CHECK (status IN ('Ongoing', 'Completed')),
  start_year INTEGER,
  end_year INTEGER,
  funding_source TEXT,
  collaborators TEXT[] DEFAULT '{}',
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Map Locations
CREATE TABLE map_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  country TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Map Connections
CREATE TABLE map_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  start_location_id UUID REFERENCES map_locations(id) ON DELETE CASCADE,
  end_location_id UUID REFERENCES map_locations(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Items
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  src TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  url TEXT,
  is_homepage BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies (Basic setup)
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE research ENABLE ROW LEVEL SECURITY;
ALTER TABLE map_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE map_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- Public Read Access
CREATE POLICY "Public Read Access" ON news FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON members FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON research FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON map_locations FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON map_connections FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Allow read for authenticated" ON admins FOR SELECT TO authenticated USING (true);

-- Admin Write Access
CREATE POLICY "Admin Write Access" ON news FOR ALL USING (auth.jwt() ->> 'email' IN (SELECT email FROM admins));
CREATE POLICY "Admin Write Access" ON members FOR ALL USING (auth.jwt() ->> 'email' IN (SELECT email FROM admins));
CREATE POLICY "Admin Write Access" ON research FOR ALL USING (auth.jwt() ->> 'email' IN (SELECT email FROM admins));
CREATE POLICY "Admin Write Access" ON map_locations FOR ALL USING (auth.jwt() ->> 'email' IN (SELECT email FROM admins));
CREATE POLICY "Admin Write Access" ON map_connections FOR ALL USING (auth.jwt() ->> 'email' IN (SELECT email FROM admins));
CREATE POLICY "Admin Write Access" ON gallery_items FOR ALL USING (auth.jwt() ->> 'email' IN (SELECT email FROM admins));

-- Storage Policies for media bucket
-- Allow authenticated admins to upload files
CREATE POLICY "Admins can upload files" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'media' AND
  (auth.jwt() ->> 'email') IN (SELECT email FROM admins)
);

-- Allow authenticated admins to update files
CREATE POLICY "Admins can update files" ON storage.objects
FOR UPDATE TO authenticated
USING (
  bucket_id = 'media' AND
  (auth.jwt() ->> 'email') IN (SELECT email FROM admins)
)
WITH CHECK (
  bucket_id = 'media' AND
  (auth.jwt() ->> 'email') IN (SELECT email FROM admins)
);

-- Allow authenticated admins to delete files
CREATE POLICY "Admins can delete files" ON storage.objects
FOR DELETE TO authenticated
USING (
  bucket_id = 'media' AND
  (auth.jwt() ->> 'email') IN (SELECT email FROM admins)
);

-- Public read access for media bucket
CREATE POLICY "Public can read files" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'media');

-- Seed initial admin
INSERT INTO admins (email) VALUES ('radaideh@umich.edu');
INSERT INTO admins (email) VALUES ('jeremoon@umich.edu');