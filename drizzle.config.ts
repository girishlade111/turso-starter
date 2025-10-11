import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  // Changed dialect to 'turso' for Turso database
  dialect: "turso",
  dbCredentials: {
    // Updated to use Turso environment variables
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
})
