#!/bin/bash
# Build script for Vercel deployment

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "⚠️  DATABASE_URL not set, using placeholder for Prisma generate"
  export DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
fi

# Generate Prisma Client
npx prisma generate

# Build Next.js
npm run build:next || next build

