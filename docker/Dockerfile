# ベースとなるDockerイメージ指定
FROM node:14-alpine

WORKDIR /react/src/web_front

RUN pwd
RUN npm run build
RUN npm run start

EXPOSE 3200