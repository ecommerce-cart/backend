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

# Copy the rest of the project files
COPY . .

RUN chmod +x ./start-dev.sh

# Install the remaining dependencies
RUN yarn install
