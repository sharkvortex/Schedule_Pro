FROM node:24-alpine3.21

WORKDIR /app/backend

COPY Backend/package*.json ./

RUN npm install

COPY Backend/ ./

# สั่ง generate Prisma client
RUN npx prisma generate

EXPOSE 8080

CMD ["node", "app.js"]
