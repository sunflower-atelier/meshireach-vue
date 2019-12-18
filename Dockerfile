FROM node:10.17.0-alpine3.9
WORKDIR /var/www/meshireach
COPY . /var/www/meshireach
RUN apk update &&\
    yarn install
EXPOSE 3002
CMD ["yarn", "dev"]
