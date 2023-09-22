ARG NODE_VERSION=20

FROM docker.io/library/node:${NODE_VERSION}-alpine as builder

WORKDIR /app

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

# ---

FROM docker.io/library/node:${NODE_VERSION}-alpine as app

WORKDIR /app

ENV NODE_ENV production
ENV NODE_POST 80

RUN apk add --no-cache sqlite

# Copy builded files from last stage
COPY --from=builder /app/.yarn .yarn
COPY --from=builder /app/package.json /app/*.lock /app/.yarnrc.yml ./
COPY --from=builder /app/.env ./
COPY --from=builder /app/public/ ./public
COPY --from=builder /app/dist/ ./dist

RUN yarn workspaces focus --production

CMD ["yarn", "start"]
