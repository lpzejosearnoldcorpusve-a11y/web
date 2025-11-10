import { migrate } from "drizzle-orm/postgres-js/migrator"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { config } from "dotenv" 

config() 

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL no está configurada")
}

const client = postgres(connectionString, { max: 1 })
const db = drizzle(client)

async function runMigrations() {
  try {
    console.log("Iniciando migraciones...")
    await migrate(db, { migrationsFolder: "drizzle" })
    console.log("Migraciones completadas")
    process.exit(0)
  } catch (error) {
    console.error("Error en migraciones:", error)
    process.exit(1)
  }
}

runMigrations()