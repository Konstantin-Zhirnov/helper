FROM node:16-alpine
WORKDIR /app/auth
ADD ./auth/*.json ./
RUN npm i -g @nestjs/cli
RUN npm install
ADD . .
RUN npm run build
CMD ["node", "./dist/main.js"]