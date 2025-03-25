# Build Stage
FROM node:22.14-alpine AS build

WORKDIR /build
COPY package*.json /build/
RUN npm install
COPY . /build/
RUN npm run build:production

# Runtime Stage
FROM node:22.14-alpine AS production

RUN addgroup -S nodejsapp_group && adduser -S nodejsapp -G nodejsapp_group
WORKDIR /runtime
COPY package*.json /runtime/
RUN npm ci --omit=dev
COPY --from=build /build/dist /runtime/dist/
USER nodejsapp
CMD ["npm", "run", "start:production"]