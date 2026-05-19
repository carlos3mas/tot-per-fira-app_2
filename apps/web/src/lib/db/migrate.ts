import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { createClient } from "@libsql/client";
import path from "path";

async function runMigrations() {
  const client = createClient({
    url: process.env.DATABASE_URL || "",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });

  const db = drizzle({ client });

  console.log("Running database migrations...");

  await migrate(db, {
    migrationsFolder: path.join(process.cwd(), "src/lib/db/migrations"),
  });

  console.log("Migrations completed successfully.");
  client.close();
}

runMigrations().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
