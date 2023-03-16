FROM node:12-alpine as build

# install python for gyp pkg
RUN apk add --no-cache --virtual .gyp python3 make g++

# make workdir
WORKDIR /usr/src/app

# copy 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install deps
RUN npm install

# copy files and folder to workdir (/usr/src/app)
COPY . .

# build vue app
RUN npm run build:cloud

FROM nginx:stable-alpine as cdn

# copy dist builded vue app to nginx container
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
