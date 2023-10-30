FROM node:16-alpine
WORKDIR /app/auth
ADD *.json ./
RUN npm i -g @nestjs/cli
RUN npm install
ADD . .
RUN npm run build
ADD /app/auth/ssl/*.pem ./dist/ssl
CMD ["node", "./dist/main.js"]