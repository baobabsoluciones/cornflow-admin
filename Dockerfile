FROM node:12-alpine

# install python for gyp pkg
RUN apk --no-cache add --virtual builds-deps build-base python
RUN apk add dos2unix

# make workdir
WORKDIR /usr/src/app

# copy 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install deps
RUN npm install

# copy files and folder to workdir (/usr/src/app)
COPY . .

# build vue app for cloud
RUN npm run cloudbuild

# convert entrypoint `initapp.sh` script to unix
RUN chmod +x initapp.sh
RUN dos2unix initapp.sh

EXPOSE 8080
# execute script initapp.sh
ENTRYPOINT ["./initapp.sh"]
