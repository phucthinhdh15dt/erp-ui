FROM node:lts as build-stage

WORKDIR /app

COPY package*.json ./
RUN yarn install
COPY ./ .

ARG BUILD_MODE=build
RUN yarn ${BUILD_MODE}

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080
