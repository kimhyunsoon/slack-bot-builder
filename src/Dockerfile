FROM node:16.13

RUN apt-get update

RUN npm install -g pm2

COPY ./ /app/

WORKDIR /app

RUN npm install

CMD [ "pm2", "start", "run.js" ]
