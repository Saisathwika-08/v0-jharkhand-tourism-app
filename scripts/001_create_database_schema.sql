-- Create users profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create destinations table
CREATE TABLE IF NOT EXISTS public.destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  category TEXT, -- waterfall, forest, temple, tribal_village, etc.
  image_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create guides table
CREATE TABLE IF NOT EXISTS public.guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  languages TEXT[], -- array of languages spoken
  specialties TEXT[], -- array of specialties
  experience_years INTEGER,
  rating DECIMAL(3, 2) DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  background_check_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  guide_id UUID REFERENCES public.guides(id),
  destination_id UUID REFERENCES public.destinations(id),
  booking_date DATE NOT NULL,
  number_of_people INTEGER NOT NULL,
  total_amount DECIMAL(10, 2),
  status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create homestays table
CREATE TABLE IF NOT EXISTS public.homestays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  price_per_night DECIMAL(10, 2),
  max_guests INTEGER,
  amenities TEXT[],
  image_urls TEXT[],
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create emergency_contacts table
CREATE TABLE IF NOT EXISTS public.emergency_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  special_code TEXT, -- for #, *, &, @ codes
  description TEXT,
  location_specific BOOLEAN DEFAULT FALSE,
  district TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create festivals table
CREATE TABLE IF NOT EXISTS public.festivals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  date_start DATE,
  date_end DATE,
  location TEXT,
  category TEXT, -- tribal, religious, cultural
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table for employment opportunities
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  eligibility TEXT,
  fee DECIMAL(10, 2),
  provider TEXT,
  contact_info TEXT,
  category TEXT, -- tourism, handicrafts, agriculture, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homestays ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for guides
CREATE POLICY "Anyone can view verified guides" ON public.guides
  FOR SELECT USING (verified = true);
CREATE POLICY "Users can manage their own guide profile" ON public.guides
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for bookings
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for homestays
CREATE POLICY "Anyone can view verified homestays" ON public.homestays
  FOR SELECT USING (verified = true);
CREATE POLICY "Users can manage their own homestays" ON public.homestays
  FOR ALL USING (auth.uid() = owner_id);

-- Public read access for destinations, emergency_contacts, festivals, courses
CREATE POLICY "Anyone can view destinations" ON public.destinations FOR SELECT USING (true);
CREATE POLICY "Anyone can view emergency contacts" ON public.emergency_contacts FOR SELECT USING (true);
CREATE POLICY "Anyone can view festivals" ON public.festivals FOR SELECT USING (true);
CREATE POLICY "Anyone can view courses" ON public.courses FOR SELECT USING (true);
