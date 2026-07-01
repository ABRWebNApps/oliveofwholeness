// Run with: node scripts/run-reminder-migration.mjs
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "..", ".env") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  // Check if columns already exist
  const { data: cols, error: colErr } = await supabase.rpc("exec_sql", {
    sql: `
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'appointments'
      AND column_name IN ('reminder_7day_sent', 'reminder_3day_sent')
    `
  });

  // exec_sql rpc might not exist — fallback to direct check
  const { data: test, error: testErr } = await supabase
    .from("appointments")
    .select("reminder_7day_sent")
    .limit(1);

  if (!testErr) {
    console.log("✅ reminder_7day_sent column already exists — migration already applied");
    process.exit(0);
  }

  console.log("Columns not found — running migration...");

  // Use management API via SQL endpoint
  const mgmtToken = process.env.SUPABASE_MANAGEMENT_KEY;
  if (mgmtToken) {
    const sql = readFileSync(resolve(__dirname, "appointment-reminders-migration.sql"), "utf8");
    const res = await fetch(
      `https://api.supabase.com/v1/projects/${process.env.NEXT_PUBLIC_SUPABASE_URL.match(/https:\/\/(.+)\.supabase/)[1]}/sql`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${mgmtToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ query: sql }),
      }
    );
    const body = await res.text();
    if (res.ok) console.log("✅ Migration applied successfully");
    else console.error("❌ Migration failed:", body);
  } else {
    console.log("⚠️ No SUPABASE_MANAGEMENT_KEY in .env");
    console.log("→ Open https://supabase.com/dashboard/project/vcrvnfpyniekosxmwjhp/sql/new");
    console.log("→ Paste and run scripts/appointment-reminders-migration.sql");
  }
}

main().catch(console.error);