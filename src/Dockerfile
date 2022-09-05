FROM node:16.13

RUN apt-get update

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul
RUN apt-get install -y tzdata

RUN npm install -g nodemon

COPY ./ /app/

WORKDIR /app

RUN npm install

CMD [ "nodemon", "-L", "run.js" ]
