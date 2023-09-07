# base_image should likely move to some devops repo
FROM node:16.14.0-alpine3.15 as base_image

RUN apk update && \
  apk upgrade

# stage to enforce isolation of prod dependency fetch which relies on credentials in .npmrc
# can consier moving to jenkins agent if we can ensure consistent node versions
FROM base_image as builder

WORKDIR /build/

COPY server/package*.json ./server/
WORKDIR /build/server/
RUN npm install

WORKDIR /build/

COPY server/ ./server/
WORKDIR /build/server/
RUN npm run build
RUN npm prune --production

# actual delivered app
FROM base_image as app

WORKDIR /app/

COPY --from=builder /build/server/ /app/server/

WORKDIR /app/server/
EXPOSE 3031

CMD ["npm", "run", "start:prod"]
