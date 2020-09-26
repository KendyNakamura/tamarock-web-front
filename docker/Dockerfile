# ベースとなるDockerイメージ指定
FROM node:14-alpine

WORKDIR /usr/src/web_front

# Installing dependencies
COPY package.json ./
RUN npm install

# Copying source files
COPY . .

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start" ]

EXPOSE 3200