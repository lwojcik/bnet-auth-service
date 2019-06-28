# bnet-auth-service
[![Travis CI Build Status](https://travis-ci.org/lukemnet/bnet-auth-service.svg?branch=master)](https://travis-ci.org/lukemnet/bnet-auth-service)
[![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/ci1n4338v95ygpdi?svg=true)](https://ci.appveyor.com/project/lwojcik/bnet-auth-service)
[![Maintainability](https://api.codeclimate.com/v1/badges/e988aeb1b13e096f989c/maintainability)](https://codeclimate.com/github/lukemnet/bnet-auth-service/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e988aeb1b13e096f989c/test_coverage)](https://codeclimate.com/github/lukemnet/bnet-auth-service/test_coverage)

REST API retrieving and caching OAuth access tokens from Blizzard Battle.net.

Under the hood it uses [Fastify](https://www.fastify.io/) and [BlizzAPI](https://www.npmjs.com/package/blizzapi).

This API should not be exposed to the internet. It is designed to run locally or as a part of a bigger, more secure API architecture.

## Requirements

* Node.js (LTS preferred)
* Redis server - recommended, but not required
* Battle.net API credentials

## Setup

The following environment variables must be set up:

* `NODE_ENV` - Node environment (`'development'` or `'production'`, default: `development`)
* `BAS_NODE_HOST` - hostname (default: `'localhost'`)
* `BAS_NODE_PORT` - port (default: `'8080'`)
* `BAS_REDIS_ENABLE` - enable Redis caching (default `'true'`)
* `BAS_REDIS_HOST` - Redis hostname (default: `'localhost'`)
* `BAS_REDIS_PORT` - Redis port (default: `'6379'`)
* `BAS_REDIS_PASSWORD` - Redis password (optional)
* `BAS_REDIS_TTL` - cache TTL (Time To Live, time for which objects will be cached)
* `BAS_REDIS_DB` - Redis database index to use
* `BAS_REDIS_CACHE_SEGMENT` - Redis cache segment used to identify keys in database (default: `'bas'`)
* `BAS_BATTLENET_REGION` - Battle.net API region to authorize against (`'us'`, `'eu'`, `'kr'` or `'ch'`, required)
* `BAS_BATTLENET_KEY` = Battle.net API application key
* `BAS_BATTLENET_SECRET` = Battle.net API application secret

To obtain Battle.net API credentials (key and secret) visit [Blizzard Battle.net Developer Portal](https://develop.battle.net/access/).

See also `.env.sample` for a dotenv template.

When in development mode, the API can load environment variables from `.env` file in root directory.

## Build and install

```
git clone https://github.com/lukemnet/bnet-auth-service.git
cd bnet-auth-service
npm install
npm run lint
npm test
npm start
```

## Start server

```
node start.js
```

## Available endpoints

### `GET /status`

API health status.

**Sample response:**

```
{"status":200,"message":"ok"}
```

### `GET /accessToken/get`

Get access token from Redis cache. If no access token is cached, API will reach Battle.net for a new one and cache it.

**Sample response:**

```
{"status":200,"data":{"accessToken":"access token here"}}
```

### `GET /accessToken/get?refresh=true`

Get access token from Battle.net (skipping Redis cache)

**Sample response:**

```
{"status":200,"data":{"accessToken":"access token here"}}
```

### `GET /accessToken/refresh`

Refresh access token stored in Redis cache. Triggering this method will cause next `GET /accessToken/get` 

```
{"status":200,"message":"Access token refreshed successfully"}
```

## License

Code is available under MIT license. See [LICENSE](https://raw.githubusercontent.com/lukemsc/sc2profile-twitch-extension-api/master/LICENSE) for more information.
