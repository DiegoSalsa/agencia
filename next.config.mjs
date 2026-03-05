/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    serverExternalPackages: ['@libsql/client', '@prisma/adapter-libsql', 'better-sqlite3', '@prisma/adapter-better-sqlite3'],
    devIndicators: false,
};

export default nextConfig;
