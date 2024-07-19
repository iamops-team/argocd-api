FROM node:22.4.1-alpine3.20
RUN apk update && apk upgrade --no-cache
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENTRYPOINT ["node", "/app/src/index.js"]