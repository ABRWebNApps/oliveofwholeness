-- Migration: Add reminder tracking columns to appointments table
-- Run this in Supabase SQL Editor

ALTER TABLE appointments
ADD COLUMN IF NOT EXISTS reminder_6day_sent BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS reminder_3day_sent BOOLEAN DEFAULT false;

-- Update existing appointments to have false defaults
UPDATE appointments
SET reminder_6day_sent = false, reminder_3day_sent = false
WHERE reminder_6day_sent IS NULL OR reminder_3day_sent IS NULL;