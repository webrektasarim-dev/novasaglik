// Cross-platform build script for Vercel
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Prepare environment variables
const env = { ...process.env };

// Check if DATABASE_URL is set
if (!env.DATABASE_URL) {
  console.log('⚠️  DATABASE_URL not set, using placeholder for Prisma generate');
  env.DATABASE_URL = 'postgresql://placeholder:placeholder@localhost:5432/placeholder';
  
  // Create temporary .env file for Prisma
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, `DATABASE_URL="${env.DATABASE_URL}"\n`);
    console.log('Created temporary .env file for build');
  }
}

try {
  // Generate Prisma Client
  console.log('Generating Prisma Client...');
  execSync('npx prisma generate', { 
    stdio: 'inherit', 
    env: env,
    shell: true,
    cwd: process.cwd()
  });
  
  // Build Next.js
  console.log('Building Next.js...');
  execSync('next build', { 
    stdio: 'inherit',
    env: env,
    shell: true,
    cwd: process.cwd()
  });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

