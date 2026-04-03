import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { pathToFileURL } from "url";

// Load .env into process.env so Netlify function handlers can read it during dev.
function loadDotEnv() {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadDotEnv();

/**
 * Dev-only plugin: intercepts /api/* requests and calls the matching
 * Netlify function handler directly — no netlify-cli needed.
 */
function netlifyFunctionsDevPlugin() {
  return {
    name: "netlify-functions-dev",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) return next();

        const functionName = req.url.replace(/^\/api\//, "").split("?")[0];
        const functionPath = resolve(process.cwd(), `data/api/${functionName}.js`);

        if (!existsSync(functionPath)) return next();

        try {
          const chunks = [];
          req.on("data", (chunk) => chunks.push(chunk));
          await new Promise((ok, fail) => {
            req.on("end", ok);
            req.on("error", fail);
          });
          const body = Buffer.concat(chunks).toString();

          const event = {
            httpMethod: req.method.toUpperCase(),
            body,
            headers: req.headers,
            queryStringParameters: Object.fromEntries(
              new URL(req.url, "http://localhost").searchParams,
            ),
          };

          // Append a timestamp so Node's ESM cache never reuses a stale module.
          const { handler } = await import(
            `${pathToFileURL(functionPath).href}?t=${Date.now()}`,
          );
          const result = await handler(event);

          res.writeHead(
            result.statusCode,
            result.headers ?? { "Content-Type": "application/json" },
          );
          res.end(result.body ?? "");
        } catch (err) {
          console.error(`[netlify-functions-dev] Error in ${functionName}:`, err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Function error during local dev." }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), netlifyFunctionsDevPlugin()],
});
