# ---- build: produce the static bundle (Lingui catalogs are compiled by the Vite plugin) ----
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- runtime: nginx serves the bundle and proxies /v1 to the backend; runs as non-root on 8080 ----
FROM nginxinc/nginx-unprivileged:1.29-alpine

# the default nginx entrypoint fills ${BACKEND_URL} into this template at container start
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

# override per environment, e.g. docker run -e BACKEND_URL=https://api.example.com
ENV BACKEND_URL=http://backend:8080
EXPOSE 8080
