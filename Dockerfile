FROM node:lts

WORKDIR /usr/src/app

COPY . ./
RUN yarn install

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

RUN yarn build

ARG NODE_ENV=start
CMD [ "sh", "-c", "yarn ${NODE_ENV}" ]