FROM node:18.12.1

WORKDIR /app

COPY . .

RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt

EXPOSE 3000

CMD ["node", "server.js"]