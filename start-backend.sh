#!/bin/sh

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Start the development server
echo "Starting the development server..."
npm run dev
