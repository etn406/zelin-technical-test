# Build Stage
FROM node:22.14-alpine AS build

ARG NODE_ENV
ARG SERVER_URL
ARG CLIENT_URL

WORKDIR /build
COPY package*.json /build/
RUN npm ci
COPY . /build/

ENV NODE_ENV=$NODE_ENV
ENV SERVER_URL=$SERVER_URL
ENV CLIENT_URL=$CLIENT_URL

RUN npm run build:production

# Runtime Stage
FROM nginx:1.27 AS runtime

COPY --from=build /build/dist/zelin-technical-test-client/browser/ /usr/share/nginx/html/
