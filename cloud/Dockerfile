ARG NODE_VERSION=20

FROM docker.io/library/node:${NODE_VERSION}-alpine as builder

WORKDIR /app

ARG APP_KEYS
ARG API_TOKEN_SALT
ARG ADMIN_JWT_SECRET
ARG TRANSFER_TOKEN_SALT
ARG JWT_SECRET
ARG DATABASE_FILENAME

ENV NODE_ENV production
ENV NODE_POST 80
ENV APP_KEYS $APP_KEYS
ENV API_TOKEN_SALT $API_TOKEN_SALT
ENV ADMIN_JWT_SECRET $ADMIN_JWT_SECRET
ENV TRANSFER_TOKEN_SALT $TRANSFER_TOKEN_SALT
ENV JWT_SECRET $JWT_SECRET
ENV DATABASE_FILENAME $DATABASE_FILENAME

RUN apk add --no-cache sqlite

COPY package.json *.lock .yarnrc.yml ./
COPY .yarn .yarn

RUN if [ -f *.lock ]; then \
      yarn install --immutable; \
    else \
      yarn install; \
    fi;

COPY . .

ENV NODE_ENV production

RUN yarn build

CMD ["yarn", "strapi", "start"]
