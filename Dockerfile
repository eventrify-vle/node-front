FROM node:16.13.0-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

CMD [ "node", "dist/index.js" ]