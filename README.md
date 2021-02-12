# Cornflow admin client
  
It comes from the following template: [Vuetify Material Dashboard](https://www.creative-tim.com/product/vuetify-material-dashboard?ref=vtymdp-readme). Their github repo is [here](https://github.com/creativetimofficial/vuetify-material-dashboard).

**Vuetify Material Dashboard** is a beautiful resource built over [Vuetify](https://vuetifyjs.com/en/), [Vuex](https://vuex.vuejs.org/installation.html) and [Vuejs](https://vuejs.org/). It will help you get started developing dashboards in no time. Vuetify Material Dashboard is the official Vuejs version of the Original [Material Dashboard PRO](https://www.creative-tim.com/product/material-dashboard). Using the Dashboard is pretty simple but requires basic knowledge of Javascript, [Vuejs](https://vuejs.org/v2/guide/) and [Vue-Router](https://router.vuejs.org/en/).

Here, only the "getting started" remains. For more documentation, resources, etc. Go to the [original repository](https://github.com/creativetimofficial/vuetify-material-dashboard).

## Installing

- Install Nodejs from [Nodejs Official Page](https://nodejs.org/en/)
- Open your terminal
- Navigate to the project
- Run `npm install` 

## Running

- Edit the `.env` file to put the URL of the Cornflow server
- Run `npm run dev` to start a local development server
- A new tab will be opened in your browser

You can also run additional npm tasks such as
- `npm run build` to build your app for production
- `npm run lint` to run linting.

## Docker

- First build the image tagged as "cornflow-admin" with `docker build -t cornflow-admin .`
- Run image in host port 8080 `docker run -p 8080:8080 -e CORNFLOW_URL=http://localhost:5000 cornflow-admin -d`. CORNFLOW_URL determine the url of cornflow app in your machine.
- Alternative you can directly run the official dockerhub image `docker run -p 8080:8080 -e CORNFLOW_URL=http://localhost:5000 baobabsoluciones/cornflow-admin -d` 