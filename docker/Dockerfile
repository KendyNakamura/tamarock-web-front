# ベースとなるDockerイメージ指定
FROM node:14-alpine

# WORKDIR /web_front

RUN pwd
RUN npm run build
RUN npm run start

EXPOSE 3200