FROM node:16.5.0-alpine3.14 as builder
WORKDIR /app
COPY package*.json ./
COPY quasar.conf.js ./
RUN npm ci
RUN npm install -g @vue/cli
RUN npm install -g @quasar/cli
COPY . .
RUN npm run build

FROM nginx:1.17.0-alpine as production
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
