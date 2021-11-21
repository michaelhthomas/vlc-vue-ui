# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./docker/ngnix.conf.template /etc/ngnix/templates/ngnix.conf.template
EXPOSE 80
CMD ["/bin/sh" , "-c" , "envsubst '$VLC_HOST $VLC_PORT' < /etc/ngnix/templates/ngnix.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
