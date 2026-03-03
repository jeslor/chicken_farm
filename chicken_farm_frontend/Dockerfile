FROM node:20-alpine
WORKDIR /app

#Copy package.json and prisma schema first to leverage Docker cache for npm install and prisma generate
COPY package.json package-lock.json ./

#Install dependencies and generate Prisma client
RUN npm ci

#Now copy the rest of the application code
COPY . .

ARG CHICKEN_BACKEND_API_URL
ENV CHICKEN_BACKEND_API_URL=$CHICKEN_BACKEND_API_URL

#Build the Next.js application
RUN npm run build

EXPOSE 3232

CMD ["npm", "run", "start"]


#Production build with multi-stage build to reduce image size
# FROM node:20-alpine AS builder
#WORKDIR /app
#COPY package.json package-lock.json ./
#COPY prisma ./prisma
#RUN npm ci
#RUN npx prisma generate
#COPY . .
#RUN npm run build

#Production stage
#FROM node:20-alpine
#WORKDIR /app
#COPY --from=builder /app/package.json /app/package-lock.json ./
#COPY --from=builder /app/.next ./.next
#COPY --from=builder /app/public ./public
#RUN npm ci --production
#EXPOSE 3232
#CMD ["npm", "start"]
