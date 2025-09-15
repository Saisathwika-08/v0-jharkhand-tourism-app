-- Insert sample verified guides data
INSERT INTO guides (
  name, email, phone, specialties, languages, experience_years, 
  rating, location, bio, verified, price_per_day
) VALUES 
(
  'Ravi Kumar Munda',
  'ravi.munda@email.com',
  '+91-9876543210',
  ARRAY['Cultural Tours', 'Tribal Heritage', 'Photography'],
  ARRAY['Hindi', 'English', 'Mundari', 'Ho'],
  8,
  4.8,
  'Ranchi',
  'Born and raised in a tribal family, Ravi has deep knowledge of Mundari culture and traditions. He specializes in cultural tours and has been guiding tourists for over 8 years.',
  true,
  2500
),
(
  'Sunita Oraon',
  'sunita.oraon@email.com',
  '+91-9876543211',
  ARRAY['Adventure', 'Wildlife', 'Trekking'],
  ARRAY['Hindi', 'English', 'Kurukh', 'Santali'],
  6,
  4.7,
  'Betla',
  'Expert in wildlife photography and jungle trekking. Sunita knows every trail in Betla National Park and has spotted tigers multiple times.',
  true,
  2200
),
(
  'Ajay Singh',
  'ajay.singh@email.com',
  '+91-9876543212',
  ARRAY['Cultural Tours', 'Adventure', 'Photography'],
  ARRAY['Hindi', 'English', 'Bhojpuri'],
  10,
  4.9,
  'Netarhat',
  'Veteran guide with 10 years of experience. Ajay knows the best sunrise and sunset spots in Netarhat and is excellent with photography tours.',
  true,
  2800
),
(
  'Priya Kharia',
  'priya.kharia@email.com',
  '+91-9876543213',
  ARRAY['Tribal Heritage', 'Handicrafts', 'Cultural Tours'],
  ARRAY['Hindi', 'English', 'Kharia', 'Ho'],
  5,
  4.6,
  'Ranchi',
  'Specializes in tribal handicrafts and traditional art forms. Priya can arrange visits to authentic tribal villages and handicraft workshops.',
  true,
  2000
),
(
  'Deepak Tirkey',
  'deepak.tirkey@email.com',
  '+91-9876543214',
  ARRAY['Adventure', 'Wildlife', 'Cultural Tours'],
  ARRAY['Hindi', 'English', 'Kurukh', 'Mundari'],
  7,
  4.8,
  'Jamshedpur',
  'Adventure enthusiast and wildlife expert. Deepak organizes thrilling jungle safaris and adventure activities around Jamshedpur region.',
  true,
  2400
),
(
  'Meera Soren',
  'meera.soren@email.com',
  '+91-9876543215',
  ARRAY['Cultural Tours', 'Tribal Heritage', 'Festivals'],
  ARRAY['Hindi', 'English', 'Santali', 'Ho'],
  9,
  4.9,
  'Deoghar',
  'Cultural expert specializing in Santali traditions and festivals. Meera has extensive knowledge of tribal customs and religious practices.',
  true,
  2600
);
