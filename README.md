# Backend Setup for the E-Commerce Project

## Overview
This document outlines the setup process for the backend of our e-commerce project.

## Tools
- **Node.js**: JavaScript runtime for building scalable network applications.
- **GraphQL**: Query language for APIs, enabling flexible data retrieval.
- **Prisma**: Modern database toolkit for Node.js and TypeScript.
- **JWT**: JSON Web Token, used for secure user authentication.

## Development Setup

- Run `docker compose up` inside the project root directory.
- Grab the backend container ID using `docker ps`.
- Access the Docker container's shell with `docker exec -it {container_id} sh`, replacing `{container_id}` with the actual ID from the previous step.
- Run `yarn prisma:migrate` inside the container to apply database migrations.
- Seed the database with `yarn seed`.
- Visit `http://localhost:6002/graphql` or `http://localhost:{port}/graphql` if you changed the port.

## Notes
- Ensure Docker is installed and running on your machine.
- Adjust the port numbers as necessary based on your Docker configuration.