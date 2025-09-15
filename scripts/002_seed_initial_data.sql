-- Insert sample destinations
INSERT INTO public.destinations (name, description, location, category, latitude, longitude) VALUES
('Hundru Falls', 'A spectacular waterfall located near Ranchi, perfect for nature lovers and photographers.', 'Ranchi', 'waterfall', 23.2599, 85.3422),
('Betla National Park', 'Home to tigers, elephants and diverse wildlife in the heart of Jharkhand.', 'Latehar', 'forest', 23.8833, 84.1833),
('Jagannath Temple Ranchi', 'A replica of the famous Puri Jagannath Temple, significant for Hindu pilgrims.', 'Ranchi', 'temple', 23.3441, 85.3096),
('Netarhat', 'Known as the Queen of Chotanagpur, famous for sunrise and sunset views.', 'Latehar', 'hill_station', 23.4667, 84.2667),
('Deoghar Temple', 'One of the twelve Jyotirlingas, major pilgrimage site for Lord Shiva devotees.', 'Deoghar', 'temple', 24.4833, 86.7000);

-- Insert emergency contacts
INSERT INTO public.emergency_contacts (service_name, phone_number, special_code, description) VALUES
('Police Emergency', '100', '#100', 'Police emergency services across Jharkhand'),
('Ambulance Service', '108', '*108', 'Medical emergency and ambulance services'),
('Fire Emergency', '101', '&101', 'Fire department emergency services'),
('Tourist Helpline', '1363', '@1363', 'Tourist assistance and information helpline'),
('She Team (Women Safety)', '181', '#181', 'Women safety and harassment reporting');

-- Insert sample festivals
INSERT INTO public.festivals (name, description, date_start, date_end, location, category) VALUES
('Sarhul Festival', 'Traditional tribal festival celebrating nature and the arrival of spring.', '2024-03-15', '2024-03-17', 'Statewide', 'tribal'),
('Karma Festival', 'Harvest festival celebrated by tribal communities with dance and music.', '2024-09-20', '2024-09-22', 'Statewide', 'tribal'),
('Tusu Parab', 'Winter festival celebrated in rural areas with folk songs and dances.', '2024-12-25', '2024-12-27', 'Rural Areas', 'cultural');

-- Insert sample courses
INSERT INTO public.courses (title, description, duration, eligibility, fee, provider, category) VALUES
('Tourism Guide Certification', 'Comprehensive training for becoming a certified tourism guide in Jharkhand.', '3 months', '12th Pass', 5000.00, 'Jharkhand Tourism Board', 'tourism'),
('Handicraft Training', 'Traditional handicraft making including bamboo work and tribal art.', '6 months', '10th Pass', 3000.00, 'Tribal Welfare Department', 'handicrafts'),
('Homestay Management', 'Training for managing homestays and hospitality services.', '2 months', '12th Pass', 4000.00, 'Tourism Department', 'tourism');
