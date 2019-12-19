FROM node:10.17.0-alpine3.9
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
