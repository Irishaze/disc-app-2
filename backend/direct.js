import { pool } from "./db/index.js";
import dotenv from "dotenv";

dotenv.config();

console.log("=== DIRECT DATABASE TEST ===");
console.log("Using DATABASE_URL:", process.env.DATABASE_URL);

async function test() {
  let client;
  try {
    client = await pool.connect();
    console.log("✅ Connected to database");

    // 1. Check database
    const db = await client.query("SELECT current_database()");
    console.log("📊 Database:", db.rows[0].current_database);

    // 2. Check tables
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log("\n📋 Tables found:");
    tables.rows.forEach((t) => console.log("  -", t.table_name));

    // 3. Check users table specifically
    const usersExists = tables.rows.some((t) => t.table_name === "users");
    console.log("\n👥 Users table exists?", usersExists);

    if (usersExists) {
      const count = await client.query("SELECT COUNT(*) FROM users");
      console.log("   Number of users:", count.rows[0].count);

      const users = await client.query("SELECT * FROM users LIMIT 5");
      console.log("\n👤 Sample users:");
      users.rows.forEach((u) => {
        console.log(`   ${u.id}: ${u.first_name} ${u.last_name} (${u.email})`);
      });
    }
  } catch (err) {
    console.error("❌ ERROR:", err.message);
    console.error("Error code:", err.code);
    console.error("Error stack:", err.stack);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

test();
