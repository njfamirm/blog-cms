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

ENV PORT=80
EXPOSE 80

# Copy builded files from last stage
COPY --from=builder /app/dist/ ./
COPY --from=builder /app/package.json ./

CMD ["yarn", "start"]
