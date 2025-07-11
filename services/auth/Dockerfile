FROM node:22.14-slim AS build
LABEL authors="yasin"

WORKDIR /home/node

COPY services/auth .

# It is required for Jest
COPY infrastructure/envs/.env.auth .env

RUN #npm install
RUN npm run test
RUN npm run build

FROM node:22.14-alpine

WORKDIR /home

COPY --from=build /home/node/build ./build
COPY --from=build /home/node/node_modules ./node_modules
COPY --from=build /home/node/package.json .

CMD ["npm", "run", "start"]

EXPOSE 5000
EXPOSE 5001
