import { neon } from "@neondatabase/serverless";

const jsonHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const jsonResponse = (statusCode, payload) => ({
  statusCode,
  headers: jsonHeaders,
  body: JSON.stringify(payload),
});

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: jsonHeaders,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed." });
  }

  const databaseUrl = process.env.NEON_DATABASE_URL;
  if (!databaseUrl) {
    return jsonResponse(500, { error: "Server configuration error: missing NEON_DATABASE_URL." });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { error: "Invalid JSON payload." });
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim().toLowerCase();
  const school = String(payload.school || "").trim();

  if (!name) {
    return jsonResponse(400, { error: "Name is required." });
  }

  if (!email || !isValidEmail(email)) {
    return jsonResponse(400, { error: "A valid email is required." });
  }

  try {
    const sql = neon(databaseUrl);

    // Add the school column if the table pre-dates this change.
    // All other columns (role, students, use_case) already exist and keep their schema.
    await sql`
      ALTER TABLE demo_requests ADD COLUMN IF NOT EXISTS school TEXT;
    `;

    // role is NOT NULL in the existing schema — supply a default so the constraint is satisfied.
    await sql`
      INSERT INTO demo_requests (name, email, role, school)
      VALUES (${name}, ${email}, 'Teacher', ${school || null});
    `;

    return jsonResponse(201, { success: true });
  } catch (error) {
    console.error("Failed to save demo request", error);
    return jsonResponse(500, { error: "Failed to save demo request." });
  }
}
