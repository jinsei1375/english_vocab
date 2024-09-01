FROM node:16.13

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

CMD ["npx", "ts-node", "src/index.ts"]