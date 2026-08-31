-- 1. Create recent_research table for a singleton record on the homepage
CREATE TABLE IF NOT EXISTS recent_research (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT DEFAULT 'publication',
    title TEXT NOT NULL,
    group_name TEXT,
    authors TEXT[],
    journal TEXT,
    year INTEGER,
    abstract TEXT,
    doi TEXT,
    image_url TEXT,
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Seed the table with existing featured research if any, or a placeholder
-- This ensures there is always one row to edit.
INSERT INTO recent_research (title, group_name, authors, journal, year, abstract, doi, image_url, pdf_url)
VALUES (
    'Leveraging large language models to analyze public sentiment on nuclear power using social media and targeted surveys',
    'computing',
    ARRAY['Jeremy Moon', 'Majdi I. Radaideh'],
    'Renewable and Sustainable Energy Reviews',
    2024,
    'Social media offers a unique lens into the public’s perception of nuclear energy, a critical factor for its widespread adoption. This research leverages large language models (LLMs) to perform high-fidelity sentiment analysis on massive social media datasets (e.g., X/Twitter) alongside targeted surveys. By fine-tuning LLMs on domain-specific nuclear energy discourse, we can identify nuanced public concerns and support patterns that traditional surveys might miss. The study highlights the potential for AI-driven tools to inform public outreach strategies and policy-making for a clean energy future.',
    '10.1016/j.rser.2024.114570',
    'https://jere-aims.supabase.co/storage/v1/object/public/media/research/1735339243555-llm_news.png',
    'https://doi.org/10.1016/j.rser.2024.114570'
)
ON CONFLICT DO NOTHING;


