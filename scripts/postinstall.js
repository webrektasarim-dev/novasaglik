// Postinstall script for Prisma generate
const { execSync } = require('child_process');

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.log('⚠️  DATABASE_URL not set, using placeholder for Prisma generate');
  process.env.DATABASE_URL = 'postgresql://placeholder:placeholder@localhost:5432/placeholder';
}

try {
  execSync('npx prisma generate', { stdio: 'inherit', env: { ...process.env } });
} catch (error) {
  console.error('Prisma generate failed:', error);
  process.exit(1);
}

