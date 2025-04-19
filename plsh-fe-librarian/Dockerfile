# ---------- STAGE 1: Build ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./

# Cài deps
RUN yarn install

# Copy toàn bộ mã nguồn
COPY . .

# Tạo biến môi trường production nếu dùng .env
ENV NODE_ENV=production

# Build Next.js app
RUN yarn build

# ---------- STAGE 2: Run ----------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy build output & cần thiết
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./

# Mặc định port
EXPOSE 3003

# Chạy app
CMD ["yarn", "start"]
