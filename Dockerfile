FROM node:20.10.0-alpine

WORKDIR /app/jokeApi

COPY ./package.json .

RUN "npm install"

COPY . .

CMD ["npm","run","start"]