FROM node:22.14-slim
LABEL authors="yasin"

WORKDIR /home/node

COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY src src

RUN npm install

EXPOSE 5000
EXPOSE 5001
