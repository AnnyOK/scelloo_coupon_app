FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# CMD npm run build && npm run start
CMD ["npm", "start"]
