import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
    const url = process.env.DATABASE_URL;

    // Remote libSQL/Turso → use libsql adapter
    if (url && (url.startsWith("libsql://") || url.startsWith("https://"))) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { PrismaLibSql } = require("@prisma/adapter-libsql");
        const authToken = process.env.DATABASE_AUTH_TOKEN || undefined;
        const adapter = new PrismaLibSql({ url, authToken });
        return new PrismaClient({ adapter } as never);
    }

    // Local SQLite → use better-sqlite3 adapter (Prisma v7)
    const dbPath = url?.replace("file:", "") || path.join(process.cwd(), "prisma", "dev.db");
    const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
    return new PrismaClient({ adapter } as never);
}

// Lazy singleton — avoids initialization at build time
export function getPrisma(): PrismaClient {
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = createPrismaClient();
    }
    return globalForPrisma.prisma;
}

// Keep the named export for backwards compatibility
export const prisma = new Proxy({} as PrismaClient, {
    get(_target, prop) {
        return (getPrisma() as unknown as Record<string | symbol, unknown>)[prop];
    },
});
