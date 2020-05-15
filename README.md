# AskGod Web UI

Scoreboard, Timeline and others CTF animation utils

## Build Setup

``` bash
# Install dependencies
$ npm install # Or yarn install

# Fake API data
$ npm run serve:api

# Fake Webscoket server for score update e2e test
$ npm run serve:ws

# Serve with hot reload at localhost:3000
$ npm start
```

## Generate local development SSL

Require [mkcert](https://github.com/FiloSottile/mkcert) to be installed.

``` bash
mkdir -p .env/local
cd .env/local
mkcert localhost
```
