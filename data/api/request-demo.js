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
  const role = String(payload.role || "Teacher").trim();
  const useCase = String(payload.useCase || "").trim();
  const rawStudents = payload.students;

  if (!name) {
    return jsonResponse(400, { error: "Name is required." });
  }

  if (!email || !isValidEmail(email)) {
    return jsonResponse(400, { error: "A valid email is required." });
  }

  let students = null;
  if (rawStudents !== undefined && rawStudents !== null && String(rawStudents).trim() !== "") {
    const parsed = Number(rawStudents);
    if (!Number.isFinite(parsed) || parsed < 0) {
      return jsonResponse(400, { error: "Students must be a valid non-negative number." });
    }
    students = Math.floor(parsed);
  }

  try {
    const sql = neon(databaseUrl);

    await sql`
      CREATE TABLE IF NOT EXISTS DEMO_REQUESTS_GFR (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        role TEXT NOT NULL,
        students INTEGER,
        use_case TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;

    await sql`
      INSERT INTO demo_requests (name, email, role, students, use_case)
      VALUES (${name}, ${email}, ${role}, ${students}, ${useCase || null});
    `;

    return jsonResponse(201, { success: true });
  } catch (error) {
    console.error("Failed to save demo request", error);
    return jsonResponse(500, { error: "Failed to save demo request." });
  }
}
