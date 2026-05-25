FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 3000
# Запускаем в dev-режиме, чтобы Payload сам накатил схему БД
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]