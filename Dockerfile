FROM node:15-alpine

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# update npm and install vue
RUN npm install npm -g
RUN npm install -g @vue/cli@latest

# install python for gyp pkg
RUN apk --no-cache add --virtual builds-deps build-base python
RUN apk add dos2unix

# make workdir
WORKDIR /usr/src/app

# copy 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install deps
RUN npm install --force

# copy files and folder to workdir (/usr/src/app)
COPY . .

# convert entrypoint `initapp.sh` script to unix
RUN chmod +x initapp.sh
RUN dos2unix initapp.sh

EXPOSE 8080
# execute script initapp.sh
ENTRYPOINT ["./initapp.sh"]
