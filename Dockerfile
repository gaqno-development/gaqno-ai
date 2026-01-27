FROM node:20-alpine AS base
RUN apk add --no-cache git libc6-compat

FROM base AS builder
WORKDIR /app

COPY package.json ./
COPY .npmrc* ./
RUN --mount=type=cache,target=/root/.npm \
    npm config set fetch-timeout 1200000 && \
    npm config set fetch-retries 10 && \
    npm install --legacy-peer-deps

COPY . .
RUN mkdir -p public
# PATCH: Fix unused @ts-expect-error in @gaqno-development/frontcore
RUN find node_modules -name useDialogForm.ts -exec sed -i '/@ts-expect-error/d' {} +
RUN npm run build

FROM nginx:alpine AS runner
WORKDIR /app

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/public /usr/share/nginx/html/public

# Copy nginx config with CORS headers
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen 3002;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # CORS headers for Module Federation (applied to all locations)
    add_header Access-Control-Allow-Origin "*" always;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept" always;

    # Handle preflight requests
    if ($request_method = OPTIONS) {
        return 204;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable" always;
        add_header Access-Control-Allow-Origin "*" always;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept" always;
    }
}
EOF

EXPOSE 3002
CMD ["nginx", "-g", "daemon off;"]
