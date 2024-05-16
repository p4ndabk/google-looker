FROM node:latest

WORKDIR /
COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]

