FROM node:21-alpine3.18

WORKDIR /app
COPY package*.json .

ENV DATABASE_URL=postgres://postgres:8880@db:5432/route?schema=public
RUN npm ci
COPY prisma ./prisma/
COPY . .
RUN npx prisma generate

EXPOSE 5000
CMD npx nodemon src/index.ts
