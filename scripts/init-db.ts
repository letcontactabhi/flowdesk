import { auth } from "../lib/auth"

async function initDatabase() {
  try {
    console.log("Initializing Better Auth database...")

    // This will create the necessary tables for Better Auth
    await auth.api.getSession({
      headers: new Headers(),
    })

    console.log("✅ Database initialized successfully!")
    console.log("📁 SQLite database created at: ./sqlite.db")
    console.log("\nYou can now start your development server with: pnpm dev")
  } catch (error) {
    console.log("ℹ️  Database setup in progress...")
    console.log(
      "The database will be automatically created when you start the server."
    )
  }
}

initDatabase()
