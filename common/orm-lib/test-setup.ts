import knex from "./database/knex.config";

async function testConnection() {
  try {
    await knex.raw("SELECT 1");
    console.log("✅ Database connection successful!");

    const result = await knex.raw("SELECT NOW()");
    console.log("✅ Database query successful!", result.rows[0]);

    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

testConnection();
