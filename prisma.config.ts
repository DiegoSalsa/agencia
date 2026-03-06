import "dotenv/config";
import { defineConfig } from "prisma/config";

const url = process.env["DATABASE_URL"] ?? "file:./dev.db";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    // For Prisma CLI commands (generate, db push with local SQLite, etc.)
    // The libsql adapter is handled at runtime in src/lib/prisma.ts
    url: url.startsWith("libsql://") || url.startsWith("https://")
      ? "file:./prisma/dev.db" // fallback for CLI — runtime uses libsql adapter
      : url,
  },
});
