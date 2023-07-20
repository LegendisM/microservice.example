FROM node:18-alpine AS base

RUN npm install -g @nestjs/cli

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

FROM base AS development

CMD [ "npx", "nest", "start", "company", "--watch" ]

FROM base AS production

RUN npx nest build company

USER node

CMD [ "node", "dist/apps/company/main" ]