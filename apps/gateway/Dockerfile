FROM node:18-alpine AS base

RUN npm install -g @nestjs/cli

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

FROM base AS development

CMD [ "npx", "nest", "start", "gateway", "--watch" ]

FROM base AS production

RUN npx nest build gateway

USER node

CMD [ "node", "dist/apps/gateway/main" ]