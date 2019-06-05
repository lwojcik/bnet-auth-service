# sc2profile-twitch-extension-api
[![Travis Build Status](https://travis-ci.org/lukemnet/sc2pte-backend.svg?branch=master)](https://travis-ci.org/lukemnet/sc2profile-twitch-extension-api)
[![Greenkeeper badge](https://badges.greenkeeper.io/lukemnet/sc2pte-backend.svg)](https://greenkeeper.io/)
[![Maintainability](https://api.codeclimate.com/v1/badges/fc6333b35828244a871c/maintainability)](https://codeclimate.com/github/lukemnet/sc2pte-backend/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fc6333b35828244a871c/test_coverage)](https://codeclimate.com/github/lukemnet/sc2pte-backend/test_coverage)

This is an official repository of the backend service (EBS) for [StarCraft II Profile Twitch Extension](https://sc2pte.lukem.net/).

For current status see [the kanban board of the project](https://github.com/orgs/lukemnet/projects/1).

## Setup

To run a server you need Node.js (preferably LTS version), MongoDB and Redis installed. MongoDB and Redis must be running before starting the API server.

Launching MongoDB as a service in Ubuntu and tailing the log file:

```
$ sudo service mongod start
$ tail -f /var/log/mongodb/mongod.log
```

Use `cp .env.sample .env` to create an environment variables file based on the provided template. Fill it with the following details:

* `API_MONGODB_CONNECTION_STRING` - if different than the default value
* `API_REDIS_CONNECTION_STRING` - if different than the default value
* `API_BATTLENET_KEY` - Battle.net API key. To obtain it you must create the application on [Battle.net Developer Portal](https://dev.battle.net/)
* `API_BATTLENET_SECRET` - Battle.net API secret. To obtain it you must create the application on [Battle.net Developer Portal](https://dev.battle.net/)
* `API_TWITCH_EXTENSION_CLIENT_ID` - Client ID needed to identify an app on Twitch ecosystem. To obtain it you must create an extension via [Extensions Dashboard on Twitch Developers portal](https://dev.twitch.tv/dashboard/extensions)
* `API_TWITCH_EXTENSION_SHARED_SECRET` - secret string used by Twitch to sign JSON Web Tokens. To obtain it you must create an extension via [Extensions Dashboard on Twitch Developers portal](https://dev.twitch.tv/dashboard/extensions)

When running the API via HTTPS you need a SSL key / certificate pair. For localhost you can [create a self-signed cert](https://gist.github.com/lwojcik/a513d0cabad380d0b8df74c08431426c). Rename the key and the cert respectively to `server.key` and `server.crt`. Copy them to `ssl/` directory of the project.

When configured correctly, you can launch the project with `npm run dev`.


You can now proceed to set up the [extension frontend](https://github.com/lukemnet/sc2pte-frontend).

## Contact

See [the project homepage](https://sc2pte.lukem.net/) for contact information.

## License

Code is available under MIT license. See [LICENSE](https://raw.githubusercontent.com/lukemsc/sc2profile-twitch-extension-api/master/LICENSE) for more information.
