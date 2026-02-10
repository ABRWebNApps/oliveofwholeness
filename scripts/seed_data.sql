-- Seed File for Olive of Wholeness Appointment System

-- 1. Clear existing data (Optional - uncomment if you want a fresh start)
-- TRUNCATE appointment_types, availability_settings, booking_configs CASCADE;

-- 2. Insert Default Appointment Types
-- These are the services that will show up on the "Book a Session" page.
INSERT INTO appointment_types (name, description, duration_minutes, price, is_active)
VALUES
('Discovery Session', 'A short 30-minute introductory call to discuss your needs and how I can help.', 30, 0.00, true),
('Standard Consultation', 'A full 60-minute therapeutic session focusing on your personal goals.', 60, 100.00, true),
('Deep Dive Workshop', 'An intensive 90-minute session for complex breakthroughs.', 90, 150.00, true)
ON CONFLICT DO NOTHING;

-- 3. Insert Default Availability (Mon-Fri, 9 AM - 5 PM)
-- Note: 1 = Monday, 5 = Friday. 0 = Sunday, 6 = Saturday.
INSERT INTO availability_settings (day_of_week, start_time, end_time, is_active)
VALUES
(1, '09:00:00', '17:00:00', true),
(2, '09:00:00', '17:00:00', true),
(3, '09:00:00', '17:00:00', true),
(4, '09:00:00', '17:00:00', true),
(5, '09:00:00', '17:00:00', true)
ON CONFLICT DO NOTHING;

-- 4. Insert Default Booking Configurations
INSERT INTO booking_configs (key, value)
VALUES
('buffer_minutes', '15'),
('lead_time_hours', '24')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
