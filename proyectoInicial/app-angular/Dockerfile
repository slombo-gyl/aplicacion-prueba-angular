FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY src src
COPY public public
COPY angular.json .
COPY tsconfig.json .
COPY tsconfig.app.json .

EXPOSE 4200

CMD ["npm", "start"]