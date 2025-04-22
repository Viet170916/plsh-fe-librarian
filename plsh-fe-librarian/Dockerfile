FROM node:20-alpine AS builder

# ✅ Cài Python, g++ để build canvas
RUN apk add --no-cache python3 make g++ && ln -sf python3 /usr/bin/python

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
ENV NODE_ENV=production
RUN yarn build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./

ENV PORT=8080
EXPOSE 8080
CMD ["yarn", "start"]
