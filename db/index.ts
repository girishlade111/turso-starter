import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"

// Check if Turso environment variables are configured
const isDatabaseConfigured = !!(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN)

// Create client only if environment variables are available
const client = isDatabaseConfigured
  ? createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    })
  : null

export const db = client ? drizzle({ client }) : null
export { isDatabaseConfigured }
