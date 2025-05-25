FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY src/ /usr/src/app/src/ 
CMD ["node", "src/server.js"]

