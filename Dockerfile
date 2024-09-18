FROM node:18.17.0-alpine AS base

# Create the directory for the backend and node_modules
RUN mkdir -p /home/node/backend/node_modules

# Set the working directory
WORKDIR /home/node/backend

# Copy package.json and yarn.lock to the container
COPY ./package.json ./
COPY ./yarn.lock ./

# Install dependencies
RUN yarn

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the project files
COPY . .

# Give executable permission to the start-backend.sh script
RUN chmod +x ./start-backend.sh

# Install the remaining dependencies
RUN yarn install
