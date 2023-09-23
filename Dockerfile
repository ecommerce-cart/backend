FROM node:18.17.0-alpine AS base

WORKDIR /home/node/backend

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY . .

FROM base as production

ENV NODE_PATH=./dist

RUN yarn build