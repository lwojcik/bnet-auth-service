# bnet-auth-service (BAS)

> **As of 15 March 2023 this project is no longer updated or maintained.**

REST microservice retrieving and caching OAuth access tokens from [Blizzard Battle.net API](https://develop.battle.net/).

Under the hood it uses [NestJS](https://nestjs.com/), [Fastify](https://www.fastify.io/) and [BlizzAPI](https://www.npmjs.com/package/blizzapi).

While the primary purpose for this service is to be run inside secure API infrastructure, it can be configured to run standalone and be exposed to the public internet with modest level of security. However, be informed that access tokens are intimate parts of OAuth authentication process and they should not run in the wild. It is your responsibility to keep your service as secure as possible. :)

## Setup

Docker and Docker Compose are preferred ways of setting up the project.

```bash
git clone https://github.com/sc2pte/bnet-auth-service.git
cd bnet-auth-service
npm install
docker-compose build
docker-compose up
```

Alternatively, you can pull a pre-built image from [GitHub Container Registry](https://github.com/orgs/sc2pte/packages/container/package/bnet-auth-service):

```bash
docker pull ghcr.io/sc2pte/bnet-auth-service:2
```

Pre-built images are also available on [Docker Hub](https://hub.docker.com/r/sc2pte/bnet-auth-service/tags):

```bash
docker pull sc2pte/bnet-auth-service:2
```

Images tagged as `1`, `2` and `latest` are built from the master branch and they are considered production-ready.

Production installation can be automated with an [Ansible role](https://github.com/sc2pte/ansible-role-bnet-auth-service).

## Environment variables

Environment variable names follow the following format: `BAS_[feature name]_[feature property]`.

When in development mode, the API can load environment variables from `.env` file in root directory.

See also `.env.sample` for a dotenv template.

### App setup

General app setup necessary to launch the service.

- `NODE_ENV` - Node environment (`'development'` or `'production'`, default: `development`)
- `BAS_NODE_HOST` - hostname (default: `'0.0.0.0'`)
- `BAS_NODE_PORT` - port (default: `'3000'`)
- `BAS_APP_CORS_ENABLE` - enable CORS (default: `false`)
- `BAS_APP_CORS_ORIGIN` - allowed CORS origin if CORS is enabled, optional

### Battle.net setup

This part of setup is mandatory. To obtain Battle.net API credentials log in to [Blizzard Battle.net Developer Portal](https://develop.battle.net/access/).and [create a new client](https://develop.battle.net/access/clients/create).

- `BAS_BATTLENET_REGION` - Battle.net API region to authorize against (`'us'`, `'eu'`, `'kr'` or `'ch'`, required). API credentials and generated access tokens are valid across all regions.
- `BAS_BATTLENET_CLIENT_ID` = Battle.net API application key
- `BAS_BATTLENET_CLIENT_SECRET` - Battle.net API application secret

### Redis setup

This setup is optional. Enabling Redis allows for caching access tokens in order to minimize the number of requests to Battle.net API.

- `BAS_REDIS_ENABLE` - enable Redis caching (default `'true'`). If you pass `false`, configuring other Redis-related environment variables is not necessary.
- `BAS_REDIS_HOST` - Redis hostname (default: `'redis'`)
- `BAS_REDIS_PORT` - Redis port (default: `'6379'`)
- `BAS_REDIS_PASSWORD` - Redis password (optional)
- `BAS_REDIS_TTL_SECS` - cache TTL in seconds (Time To Live, time for which objects will be cached). Access tokens issued by Battle.net API are valid for 24 hours, so it is not advisable to set TTL longer than 86400 seconds (default: `2000`).
- `BAS_REDIS_DB` - Redis database index to use
- `BAS_REDIS_KEY_PREFIX` - key prefix used to identify keys related to bnet-auth-service (default: `'bas'`)
- `BAS_REDIS_KEY_NAME` - name used to identify the key under which cached access token is stored (default: `accesstoken`)

### Throttling / rate limiting

Rate limiting is always on. To effectively disable it, set high values for TTL and limit. Default limits are significantly below limits of Battle.net API (36,000 requests per hour / 100 requests per second) and they shouldn't trigger 429 Too Many Requests errors.

- `BAS_THROTTLE_TTL_SECS` - how long throttling is effective per single client (default: 60 seconds)
- `BAS_THROTTLE_LIMIT`- limit of requests per client within alloted TTL (default: 300)

When the limit is reached, the service will return 429 error code with the following body:

```json
{
  "statusCode": 429,
  "message": "ThrottlerException: Too Many Requests"
}
```

### Authorization

Bnet-auth-service supports simplified authorization flow with JWT tokens. If you enable it, each request must contain a JWT token containing pre-configured username (`{ 'username': 'some-user' }`), signed by a pre-configured secret, passed inside a request header:

```js
{
  Authorization: 'Bearer <JWT Token here>';
}
```

- `BAS_AUTH_ENABLE` - whether authorization should be enabled (default: `false`)
- `BAS_AUTH_USERNAME` - username passed as JWT payload
- `BAS_AUTH_JWT_SECRET` - secret that should be used to sign and verify JWT token

If the incoming request doesn't contain correct JWT token, all endpoints will return 401 error:

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### HTTPS support

Service can run in HTTPS mode using provided key and certificate.

- `BAS_HTTPS_ENABLE` - whether HTTPS should be supported (default: `false`)
- `BAS_HTTPS_KEY_PATH` - path to HTTPS signing key (example: `certs/localhost.key`)
- `BAS_HTTPS_CERT_PATH` - path to HTTPS certificate (example: `certs/localhost.pem`)

### Refreshing access token via cron

If enabled, service will refresh cached access token on a regular interval using NestJS cron mechanism.

- `BAS_CRON_ENABLE` - enable cron task for refreshing access token (default: `false`)
- `BAS_CRON_PATTERN` - crontab-compatible pattern to determine how often the task is supposed to run (if enabled, default value is `0 */30 * * * *`, i.e. once every 30 minutes)

## Available endpoints

### `GET /`

General information about the service.

```json
{
  "name": "bnet-auth-service",
  "endpoints": {
    "status": {
      "url": "/status"
      "method": "GET"
    },
    "accesstoken": {
      "url": "/accesstoken",
      "method": "GET"
    },
    "accesstokenrefresh": {
      "url": "/accesstoken?refresh=true",
      "method": "GET"
      }
    }
  }
```

### `GET /status`

Information on service health.

```json
{
  "status": "ok",
  "uptime": "00:05:05.313",
  "timestamp": "2022-07-01T18:39:06.828Z"
}
```

### `GET /accessToken`

Get access token either (1) from Redis cache if there is cached access token available or (2) directly from Battle.net API and cache it in Redis store.

If `BAS_REDIS_ENABLE` is set to `false`, this endpoint always queries Battle.net API for a new access token.

If `BAS_REDIS_ENABLE` is set to `true`, each access token obtained from Battle.net API is cached in Redis store.

`source` property returns one of two values: `battlenet` or `cache`, depending on where the access token was obtained from.

```json
{
  "accessToken": "<access token here>",
  "source": "cache"
}
```

If wrong credentials are used, the service will return 200 OK response with the following body:

```json
{
  "error": "BnetApiError",
  "statusCode": 401,
  "message": "Request failed with status code 401",
  "id": "6bc-043d-4d58-b28b-72a6605dcf78"
}
```

`id` is the request identifier than can be used to find the error in service logs.

### `GET /accessToken?refresh=true`

Get access token from Battle.net API regardless of Redis cache state and cache it.

This method is meant as a fallback for service consumers to use when access token returned from previous request turns out to be invalid or expired.

```json
{
  "accessToken": "<access token here>",
  "source": "battlenet"
}
```

## Swagger

Swagger is available when `NODE_ENV` is set to `development` at `http://service.url.here/api`. When using the service locally, the URL is most likely `http://localhost:3000/api`.
