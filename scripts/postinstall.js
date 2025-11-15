// Postinstall script for Prisma generate
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
    console.log('Created temporary .env file for postinstall');
  }
}

try {
  execSync('npx prisma generate', { 
    stdio: 'inherit', 
    env: env,
    shell: true,
    cwd: process.cwd()
  });
} catch (error) {
  console.error('Prisma generate failed:', error);
  process.exit(1);
}

