FROM node:16-alpine as build
WORKDIR /client
ADD *.json ./
RUN npm install
ADD . .
RUN npm run build
FROM nginx:1.16.0-alpine
COPY --from=build /client/build /usr/share/nginx/html
COPY --from=build /client/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]