FROM node:alpine

WORKDIR /usr/api
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm","run","dev-start"]

