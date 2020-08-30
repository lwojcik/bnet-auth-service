# bnet-auth-service
[![Travis CI Build Status](https://travis-ci.org/sc2pte/bnet-auth-service.svg?branch=master)](https://travis-ci.org/sc2pte/bnet-auth-service)
[![Maintainability](https://api.codeclimate.com/v1/badges/e988aeb1b13e096f989c/maintainability)](https://codeclimate.com/github/sc2pte/bnet-auth-service/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e988aeb1b13e096f989c/test_coverage)](https://codeclimate.com/github/sc2pte/bnet-auth-service/test_coverage) 

REST API service retrieving and caching OAuth access tokens from [Blizzard Battle.net API](https://develop.battle.net/).

Under the hood it uses [Fastify](https://www.fastify.io/) and [BlizzAPI](https://www.npmjs.com/package/blizzapi).

This API is not meant to be exposed to the internet as-is. Access tokens are intimate and volatile parts of authentication process and they should not run in the wild. This service is designed to run locally or as a part of a bigger, more secure API architecture.

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
* `BAS_REDIS_TTL` - cache TTL in seconds (Time To Live, time for which objects will be cached). Access tokens issued by Battle.net API are valid for 24 hours, so it is not advisable to set TTL longer than 86400 seconds (default: `2000`).
* `BAS_REDIS_DB` - Redis database index to use
* `BAS_REDIS_CACHE_SEGMENT` - Redis cache segment used to identify keys in database (default: `'bas'`)
* `BAS_BATTLENET_REGION` - Battle.net API region to authorize against (`'us'`, `'eu'`, `'kr'` or `'ch'`, required)
* `BAS_BATTLENET_KEY` = Battle.net API application key
* `BAS_BATTLENET_SECRET` = Battle.net API application secret

To obtain Battle.net API credentials (key and secret) visit [Blizzard Battle.net Developer Portal](https://develop.battle.net/access/).

See also `.env.sample` for a dotenv template.

When in development mode, the API can load environment variables from `.env` file in root directory.

Installation can also be automated with an [Ansible role](https://github.com/sc2pte/ansible-role-bnet-auth-service).

## Build and install

```
git clone https://github.com/lukemnet/bnet-auth-service.git
cd bnet-auth-service
npm install
npm run build
```

## Start server

```
npm start
```

## Available endpoints

### `GET /status`

API health status.

**Sample response:**

```
{"status":200,"message":"ok"}
```

### `GET /accessToken/get`

Get access token either (1) from Redis cache if there is cached access token available or (2) directly from Battle.net API and cache it in Redis store.

**Sample response:**

```
{"status":200,"data":{"accessToken":"access token here"}}
```

### `GET /accessToken/get?refresh=true`

Get access token from Battle.net API regardless of Redis cache state and cache it.

This method is meant as a fallback for service consumers to use when access token returned from previous request turns out to be invalid or expired.

**Sample response:**

```
{"status":200,"data":{"accessToken":"access token here"}}
```

### `GET /accessToken/refresh`

Get access token from Battle.net API and store it in Redis cache. Triggering this method will cause next `GET /accessToken/get` to load access token from Redis cache.

This method is designed to be used by a cron job in order to keep Redis cache warm and minimize number of Battle.net API requests for a new access token.

```
{"status":200,"message":"Access token refreshed successfully"}
```

## License

Code is available under MIT license. See [LICENSE](https://raw.githubusercontent.com/lukemnet/bnet-auth-service/master/LICENSE) for more information.
