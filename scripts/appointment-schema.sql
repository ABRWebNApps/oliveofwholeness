-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Appointment Types (e.g., 30-min discovery, 60-min consultation)
CREATE TABLE IF NOT EXISTS appointment_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL,
    price DECIMAL(10, 2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Availability (Global Hours for each day of the week)
CREATE TABLE IF NOT EXISTS availability_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0 (Sunday) to 6 (Saturday)
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Blackout Dates (e.g., holidays, vacations)
CREATE TABLE IF NOT EXISTS blackout_dates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blackout_date DATE NOT NULL UNIQUE,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Appointments
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_type_id UUID REFERENCES appointment_types(id),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    notes TEXT,
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'rescheduled', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Global Booking Settings (e.g., buffer times, lead time)
CREATE TABLE IF NOT EXISTS booking_configs (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initial Data Setup
-- Default Appointment Types
INSERT INTO appointment_types (name, description, duration_minutes) VALUES
('Discovery Session', 'A short 30-minute introductory call to discuss your needs.', 30),
('Standard Consultation', 'A full 60-minute therapeutic session.', 60);

-- Default Availability (Mon-Fri, 9 AM - 5 PM)
INSERT INTO availability_settings (day_of_week, start_time, end_time) VALUES
(1, '09:00:00', '17:00:00'),
(2, '09:00:00', '17:00:00'),
(3, '09:00:00', '17:00:00'),
(4, '09:00:00', '17:00:00'),
(5, '09:00:00', '17:00:00');

-- Default Configs
INSERT INTO booking_configs (key, value) VALUES
('buffer_minutes', '15'),
('lead_time_hours', '24');

-- RLS (Row Level Security) - Basic setup
-- In a real scenario, you'd restrict 'availability_settings' and 'appointment_types' edits to admins
-- For now, let's enable RLS on appointments at least
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can create an appointment (public booking)
CREATE POLICY "Public can book" ON appointments FOR INSERT WITH CHECK (true);

-- Policy: Admins can view and manage everything
-- (Assumes you have an auth system where admin role can be checked)
-- Example: CREATE POLICY "Admins can manage" ON appointments FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
