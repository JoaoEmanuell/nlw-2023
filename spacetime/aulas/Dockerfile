FROM node:18.16.0-alpine

RUN apk add bash

WORKDIR /home/node/app

COPY package-lock.json .
COPY package.json .

EXPOSE 8080

RUN npm install

CMD tail -f /dev/null