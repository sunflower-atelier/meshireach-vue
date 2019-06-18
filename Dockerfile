FROM node:8.16.0-alpine
WORKDIR /var/www/meshireach
COPY . /var/www/meshireach
RUN apk update &&\
    yarn install
EXPOSE 3002
CMD ["yarn", "dev"]
