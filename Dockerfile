FROM node:18.17.0-alpine AS base

RUN mkdir -p /home/node/backend/node_modules

WORKDIR /home/node/backend

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

RUN npx prisma generate

COPY . .

RUN yarn install

# FROM base as production

# ENV NODE_PATH=./dist

# RUN yarn build
