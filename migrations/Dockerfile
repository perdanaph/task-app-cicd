FROM node:20-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY migrate.js .

CMD ["node", "migrate.js"]