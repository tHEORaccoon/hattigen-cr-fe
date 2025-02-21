FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run",  "dev" ]