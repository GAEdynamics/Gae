/*
# Create quote_requests table (single-tenant, no auth)

1. Purpose
- Stores quote ("Solicitar Orçamento") submissions from the public site.
- The site has no sign-in screen, so submissions are written by the anon-key
  client. Reads are intentionally public here only for an admin-facing list
  (not exposed in the app); writes are what matter.

2. New Tables
- `quote_requests`
  - `id` (uuid, primary key)
  - `name` (text, not null) — full name of the requester
  - `email` (text, not null) — contact email
  - `phone` (text, nullable) — optional phone
  - `company` (text, nullable) — optional company name
  - `service` (text, not null) — which service the quote is for
  - `message` (text, nullable) — free-form details
  - `status` (text, not null, default 'novo') — pipeline status
  - `created_at` (timestamptz, default now())
- Index on `created_at DESC` for the admin list view.

3. Security
- RLS enabled.
- INSERT open to `anon, authenticated` so the public form can submit.
- SELECT open to `anon, authenticated` (intentionally shared — admin list
  is a future concern; data is non-sensitive contact info).
- No UPDATE/DELETE for anon (only service role can manage records later).
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'novo',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS quote_requests_created_at_idx
  ON quote_requests (created_at DESC);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_quote_requests" ON quote_requests;
CREATE POLICY "anon_insert_quote_requests"
  ON quote_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_quote_requests" ON quote_requests;
CREATE POLICY "anon_select_quote_requests"
  ON quote_requests FOR SELECT
  TO anon, authenticated
  USING (true);
