import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.DATABASE_URL || "",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

async function columnExists(table, column) {
  const result = await client.execute(`PRAGMA table_info(${table})`);
  return result.rows.some((row) => row.name === column);
}

async function addColumnIfNotExists(table, column, definition) {
  const exists = await columnExists(table, column);
  if (!exists) {
    console.log(`Adding column ${column} to ${table}...`);
    await client.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
    console.log(`  ✓ ${column} added.`);
  } else {
    console.log(`  – ${column} already exists, skipping.`);
  }
}

async function runMigrations() {
  console.log("Running database migrations...");

  await addColumnIfNotExists("orders", "nombre_penya", "text");
  await addColumnIfNotExists("orders", "direccion", "text NOT NULL DEFAULT 'sin_direccion'");
  await addColumnIfNotExists("orders", "segundo_numero_telefono", "text");
  await addColumnIfNotExists("orders", "comentarios", "text");
  await addColumnIfNotExists("orders", "notas", "text");
  await addColumnIfNotExists("orders", "localizacion_evento", "text");
  await addColumnIfNotExists("orders", "fecha_inicio", "text");
  await addColumnIfNotExists("orders", "fecha_fin", "text");
  await addColumnIfNotExists("orders", "tipo_evento", "text");

  console.log("Migrations completed successfully.");
  client.close();
}

runMigrations().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
