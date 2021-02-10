#!/bin/sh
# Cornflow-admin init script for Dockerfile ENTRYPOINT

# Global defaults and back-compat
: "${CORNFLOW_URL:="http://localhost:5000"}"
: "${PORT:="8080"}"

export \
  CORNFLOW_URL \
  PORT

# check if cornflow_url is empty con `.env.cloud`
if [ -z $(cat /usr/src/app/.env.cloud | grep BASE_URL) ]; then
echo "VUE_APP_BASE_URL=${CORNFLOW_URL}" >> /usr/src/app/.env.cloud
fi

# execute serve with mode `cloud`
npm run cloud --port $PORT