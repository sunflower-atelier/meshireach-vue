FROM node:8.16.0-alpine
WORKDIR /var/www/meshireach

RUN apk update &&\
    npm install npm

EXPOSE 3002
CMD ["yarn", "dev"]
