# Build Stage
FROM node:22.14-alpine AS build

WORKDIR /build
COPY package*.json /build
RUN npm ci
COPY . /build
RUN npm run build:production

# Runtime Stage
FROM nginx:1.27 AS runtime

COPY --from=build /build/dist/zelin-technical-test-client/browser /usr/share/nginx/html
