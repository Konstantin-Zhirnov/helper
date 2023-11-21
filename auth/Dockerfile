FROM node:16-alpine
WORKDIR /auth
ADD *.json ./
RUN npm i -g @nestjs/cli
RUN npm install
ADD . .
RUN npm run build
ADD /etc/letsencrypt/live/helper.plus/*.pem ./dist
CMD ["node", "./dist/main.js"]