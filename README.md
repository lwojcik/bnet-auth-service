# bnet-auth-service
[![Build status](https://ci.appveyor.com/api/projects/status/5lunfkv0ot8rh3yt/branch/master?svg=true)](https://ci.appveyor.com/project/lwojcik/bnet-auth-service/branch/master)
[![codecov](https://codecov.io/gh/sc2pte/bnet-auth-service/branch/master/graph/badge.svg?token=sFEmFjKiRo)](https://codecov.io/gh/sc2pte/bnet-auth-service)

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
* `BAS_REDIS_TTL_SECS` - cache TTL in seconds (Time To Live, time for which objects will be cached). Access tokens issued by Battle.net API are valid for 24 hours, so it is not advisable to set TTL longer than 86400 seconds (default: `2000`).
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
git clone https://github.com/sc2pte/bnet-auth-service.git
cd bnet-auth-service
npm install
npm run build
```

## Start server

```
npm start
```

## Via Docker

Build and run a Docker image locally in development mode:

```
git clone https://github.com/sc2pte/bnet-auth-service.git
cd bnet-auth-service
docker build -t bnet-auth-service:latest .
docker run -e NODE_ENV=development -p 8083:8083 bnet-auth-service:latest
```

Pull a pre-built image from [GitHub Container Registry](https://github.com/orgs/sc2pte/packages/container/package/bnet-auth-service):

```
docker pull ghcr.io/sc2pte/bnet-auth-service:latest
```

Pull a pre-built image from [Docker Hub](https://hub.docker.com/r/sc2pte/bnet-auth-service/tags):

```
docker pull sc2pte/bnet-auth-service:latest
```

Images tagged as `vX.X.X-master` are built from the master branch and they are considered production-ready.

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
