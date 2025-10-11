import { createClient } from "@libsql/client"

async function initializeDatabase() {
  // Create independent Turso client
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })

  try {
    console.log("🚀 Initializing Turso database...")

    // Create todos table
    console.log("📝 Creating todos table...")
    await client.execute(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `)

    // Create index for completed status
    console.log("📊 Creating index for completed status...")
    await client.execute(`
      CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed)
    `)

    // Create index for created_at ordering
    console.log("📊 Creating index for created_at...")
    await client.execute(`
      CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at)
    `)

    // Insert sample todos individually
    console.log("📋 Inserting sample todos...")

    await client.execute({
      sql: `INSERT OR IGNORE INTO todos (id, title, description, completed) VALUES (?, ?, ?, ?)`,
      args: [1, "Set up Turso Database", "Configure Turso with Drizzle ORM for the todo app", 1],
    })

    await client.execute({
      sql: `INSERT OR IGNORE INTO todos (id, title, description, completed) VALUES (?, ?, ?, ?)`,
      args: [2, "Build todo interface", "Create a modern React interface for managing todos", 0],
    })

    await client.execute({
      sql: `INSERT OR IGNORE INTO todos (id, title, description, completed) VALUES (?, ?, ?, ?)`,
      args: [3, "Add dark mode styling", "Implement dark theme similar to Vercel docs", 0],
    })

    await client.execute({
      sql: `INSERT OR IGNORE INTO todos (id, title, description, completed) VALUES (?, ?, ?, ?)`,
      args: [4, "Deploy to Vercel", "Deploy the completed todo app to Vercel platform", 0],
    })

    console.log("✅ Database initialization completed successfully!")

    // Verify the setup by counting todos
    const result = await client.execute("SELECT COUNT(*) as count FROM todos")
    console.log(`📊 Total todos in database: ${result.rows[0]?.count || 0}`)
  } catch (error) {
    console.error("❌ Error initializing database:", error)
    throw error
  } finally {
    // Close the client connection
    client.close()
  }
}

// Run the initialization
initializeDatabase()
  .then(() => {
    console.log("🎉 Setup complete!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("💥 Setup failed:", error)
    process.exit(1)
  })
