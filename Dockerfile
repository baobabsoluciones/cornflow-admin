FROM node:12-alpine

# install python for gyp pkg
RUN apk --no-cache add --virtual builds-deps build-base python

# make workdir
WORKDIR /usr/src/app

# copy 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install deps
RUN npm install

# copy files and folder to workdir (/usr/src/app)
COPY . .

# build vue app
RUN npm run build

EXPOSE 8080
# execute script initapp.sh
CMD ["serve", "-s", "dist", "-l", "8080"]
