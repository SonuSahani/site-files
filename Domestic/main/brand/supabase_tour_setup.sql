-- =====================================================
-- SUPABASE SETUP: Track My Tour
-- Run this in your Supabase SQL Editor (Dashboard → SQL)
-- =====================================================

-- 1. Create the tours table
CREATE TABLE IF NOT EXISTS tours (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  access_code   text UNIQUE NOT NULL,
  name          text NOT NULL,
  dates         text NOT NULL,
  travelers     int DEFAULT 1,
  location      text NOT NULL,
  booking_ref   text,
  progress      int DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  next_stop     text,
  eta           text,
  days          jsonb NOT NULL DEFAULT '[]',
  weather       jsonb DEFAULT '[]',
  checklist     jsonb DEFAULT '[]',
  emergency_contacts jsonb DEFAULT '[]',
  medical_facility   jsonb DEFAULT '{}',
  created_at    timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

-- 3. Allow public (anon) read access via access_code
DROP POLICY IF EXISTS "Allow public read by access_code" ON tours;
CREATE POLICY "Allow public read by access_code"
  ON tours FOR SELECT
  USING (true);

-- 4. Insert demo tour (same data as the old hardcoded version)
INSERT INTO tours (access_code, name, dates, travelers, location, booking_ref, progress, next_stop, eta, days, weather, checklist, emergency_contacts, medical_facility)
VALUES (
  'THRLL23',
  'Sikkim Ice Trek & Valley',
  'Mar 5 – Mar 10, 2026',
  6,
  'Sikkim, India',
  '#TT-2024-1438',
  33,
  'Dzongri Campsite',
  '~2h 30min',
  '[
    {
      "day": 1, "label": "Day 1 — Mar 5", "status": "done",
      "activities": [
        { "icon": "✈️", "name": "Arrival at Bagdogra Airport", "time": "09:00 AM", "duration": "—", "status": "done", "tip": "Check your baggage claim tags. Driver will be waiting at Exit Gate 2." },
        { "icon": "🚌", "name": "Transfer to Gangtok", "time": "10:30 AM", "duration": "4 hrs", "status": "done", "tip": "Scenic NH10 route. Rest and hydrate for altitude adjustment." },
        { "icon": "🏨", "name": "Check-in: Hotel Tashi Deleg", "time": "03:00 PM", "duration": "—", "status": "done", "tip": "Room 204-206 reserved. Breakfast included from tomorrow." },
        { "icon": "🍽️", "name": "Welcome Dinner & Briefing", "time": "07:00 PM", "duration": "90 min", "status": "done", "tip": "Meet your trek guide Pemba Sherpa at the hotel restaurant." }
      ]
    },
    {
      "day": 2, "label": "Day 2 — Mar 6", "status": "active",
      "activities": [
        { "icon": "🥾", "name": "Drive to Yuksom", "time": "07:00 AM", "duration": "3 hrs", "status": "done", "tip": "Last major town before trek. Fill water bottles here." },
        { "icon": "🏕️", "name": "Trek: Yuksom → Sachen", "time": "10:30 AM", "duration": "4 hrs", "status": "now", "tip": "Easy gradient. Watch for leeches during monsoon but March is clear. Estimated 8km." },
        { "icon": "⛺", "name": "Camp Setup at Sachen", "time": "03:30 PM", "duration": "—", "status": "upcoming", "tip": "Sleeping bags rated to -10°C. Eat a full meal tonight." },
        { "icon": "🌌", "name": "Night Sky Viewing", "time": "08:30 PM", "duration": "60 min", "status": "upcoming", "tip": "Bring a torch. Milky Way visible from 9 PM." }
      ]
    },
    {
      "day": 3, "label": "Day 3 — Mar 7", "status": "upcoming",
      "activities": [
        { "icon": "🏔️", "name": "Trek: Sachen → Dzongri", "time": "07:00 AM", "duration": "6 hrs", "status": "upcoming", "tip": "Steeper climb. Take it slow to avoid altitude sickness. 4,020m." },
        { "icon": "🌨️", "name": "Snow Activity at Dzongri", "time": "02:00 PM", "duration": "90 min", "status": "upcoming", "tip": "Snow trek gear provided. Temperature: -2°C to 5°C." }
      ]
    },
    {
      "day": 4, "label": "Day 4 — Mar 8 (Summit Day)", "status": "upcoming",
      "activities": [
        { "icon": "⛰️", "name": "Goecha La Viewpoint Trek", "time": "05:00 AM", "duration": "8 hrs", "status": "upcoming", "tip": "Pre-dawn start essential for best Kangchenjunga views. Hot tea at camp." },
        { "icon": "📸", "name": "Kangchenjunga Sunrise", "time": "07:15 AM", "duration": "45 min", "status": "upcoming", "tip": "This is THE moment of the trip. Camera fully charged?" }
      ]
    }
  ]'::jsonb,
  '[
    { "day": "Today", "icon": "⛅", "temp": "8°C / 2°C", "desc": "Partly cloudy", "rain": "10%" },
    { "day": "Tomorrow", "icon": "🌨️", "temp": "4°C / -2°C", "desc": "Light snow", "rain": "70%" },
    { "day": "Mar 8", "icon": "☀️", "temp": "6°C / 0°C", "desc": "Clear skies", "rain": "5%" },
    { "day": "Mar 9", "icon": "🌤️", "temp": "7°C / 1°C", "desc": "Mostly clear", "rain": "15%" },
    { "day": "Mar 10", "icon": "⛅", "temp": "9°C / 3°C", "desc": "Partly cloudy", "rain": "20%" }
  ]'::jsonb,
  '[
    {
      "title": "🧥 Clothing & Gear",
      "items": ["Thermal inner layers (3 sets)", "Waterproof jacket", "Fleece mid-layer", "Trekking pants", "Waterproof trekking boots", "Warm gloves & balaclava", "Sunglasses (UV protection)", "Trekking poles"]
    },
    {
      "title": "🎒 Essentials",
      "items": ["Passport / Aadhar (original)", "Booking confirmation email", "₹5,000 cash (for local)", "Power bank (20,000 mAh)", "Headlamp + extra batteries", "Reusable water bottle", "Energy bars / trail mix"]
    },
    {
      "title": "💊 Health & Safety",
      "items": ["Diamox (altitude sickness)", "First aid kit", "Sunscreen SPF 50+", "Lip balm", "Personal medication", "Insect repellent", "Hand sanitizer"]
    }
  ]'::jsonb,
  '[
    { "name": "Tour Guide — Pemba Sherpa", "num": "+91 98765 43210", "note": "Available 24/7 during trek" },
    { "name": "ThrillTrails Support", "num": "+91 33 4567 8900", "note": "8 AM – 10 PM daily" },
    { "name": "Sikkim State Police", "num": "100", "note": "Emergency — Sikkim region" },
    { "name": "Mountain Rescue (ITBP)", "num": "+91 3592 201234", "note": "High-altitude emergencies" },
    { "name": "Nearest Hospital", "num": "+91 3592 232467", "note": "Gangtok District Hospital" }
  ]'::jsonb,
  '{ "name": "Gangtok District Hospital", "address": "NH 31A, Tadong, Gangtok — approx. 45 km from base camp", "phone": "03592-232467" }'::jsonb
)
ON CONFLICT (access_code) DO NOTHING;
