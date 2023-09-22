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

# FROM docker.io/library/node:${NODE_VERSION}-alpine as app

# WORKDIR /app

ARG APP_KEYS
ARG API_TOKEN_SALT
ARG ADMIN_JWT_SECRET
ARG TRANSFER_TOKEN_SALT
ARG JWT_SECRET

ENV NODE_ENV production
ENV NODE_POST 80
ENV APP_KEYS $APP_KEYS
ENV API_TOKEN_SALT $API_TOKEN_SALT
ENV ADMIN_JWT_SECRET $ADMIN_JWT_SECRET
ENV TRANSFER_TOKEN_SALT $TRANSFER_TOKEN_SALT
ENV JWT_SECRET $JWT_SECRET

RUN apk add --no-cache sqlite

# Copy builded files from last stage
# COPY --from=builder /app/.yarn .yarn
# COPY --from=builder /app/package.json /app/*.lock /app/.yarnrc.yml ./
# COPY --from=builder /app/public/ ./public
# COPY --from=builder /app/dist/ ./dist

RUN echo $JWT_SECRET

# RUN yarn workspaces focus --production

CMD ["yarn", "start"]
