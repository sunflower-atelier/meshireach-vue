FROM node:8.16.0-alpine
RUN apk update &&\
    apk upgrade &&\
    apk add --update --no-cache yarn
WORKDIR /var/www/meshireach

COPY package.json .
COPY yarn.lock .
RUN yarn install --prod
EXPOSE 3002
EXPOSE 80

COPY . .
RUN yarn build
CMD [ "yarn", "start" ]
