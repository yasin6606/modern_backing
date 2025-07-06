FROM node:22.14-slim AS build
LABEL authors="yasin"

WORKDIR /home/node

COPY . .

RUN npm install
RUN npm run build

FROM node:22.14-alpine

WORKDIR /home

COPY --from=build /home/node/build ./build
COPY node_modules node_modules
COPY package.json .

CMD ["npm", "run", "start"]

EXPOSE 5000
EXPOSE 5001
