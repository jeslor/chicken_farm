FROM node:20-slim
WORKDIR /app

# Install OpenSSL
RUN apt-get update -y && apt-get install -y openssl

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate

COPY . .
EXPOSE 4000
CMD ["npm", "start"]