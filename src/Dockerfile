FROM node:16.13

RUN apt-get update

RUN npm install -g nodemon

COPY ./ /app/

WORKDIR /app

RUN npm install

CMD [ "nodemon", "run.js" ]
