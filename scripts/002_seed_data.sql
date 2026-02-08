-- Insert sample resources
INSERT INTO public.resources (title, content, category) VALUES
('Finding Peace in Prayer', 'Prayer is a powerful tool for emotional healing and spiritual growth. In times of distress, turning to God through prayer can provide comfort, guidance, and strength...', 'Spiritual Growth'),
('Overcoming Anxiety Through Faith', 'Anxiety can feel overwhelming, but with faith as our foundation, we can find peace even in the storm. This guide explores biblical approaches to managing anxiety...', 'Mental Health'),
('The Healing Power of Forgiveness', 'Forgiveness is not just a gift we give to others, but a pathway to our own emotional freedom. Learn how biblical forgiveness can transform your heart...', 'Emotional Healing');

-- Insert sample community feed posts
INSERT INTO public.community_feed (title, content) VALUES
('Welcome to Our Community', 'We are so grateful you have joined our community of faith and healing. Here you will find encouragement, resources, and updates about our ministry.'),
('Weekly Prayer Group', 'Join us every Wednesday at 7 PM for our weekly prayer group. Together we lift up our concerns and celebrate God''s goodness in our lives.'),
('New Resource Available', 'We have just added a new guide on "Finding Hope in Difficult Times" to our resources section. Check it out for biblical encouragement and practical steps.');

-- Insert default admin user (password should be hashed in real implementation)
-- For demo purposes, using a simple hash - in production, use proper bcrypt
INSERT INTO public.admin_users (email, password_hash, name) VALUES
('ayimifaithful2014@gmail.com', '$2b$10$example_hash_here', 'Faith Administrator');
