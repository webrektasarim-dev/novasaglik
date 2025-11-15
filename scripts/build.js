// Cross-platform build script for Vercel
const { execSync } = require('child_process');

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.log('⚠️  DATABASE_URL not set, using placeholder for Prisma generate');
  process.env.DATABASE_URL = 'postgresql://placeholder:placeholder@localhost:5432/placeholder';
}

try {
  // Generate Prisma Client
  console.log('Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit', env: { ...process.env } });
  
  // Build Next.js
  console.log('Building Next.js...');
  execSync('next build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

