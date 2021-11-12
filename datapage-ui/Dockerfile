FROM node:alpine

WORKDIR /usr/react
ENV PATH /usr/app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install
RUN npm install react-scripts@3.3.1 -g

COPY . .

EXPOSE 3003

CMD ["npm","start"]

