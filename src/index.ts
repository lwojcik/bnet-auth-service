import { FastifyInstance } from "fastify";

require('dotenv').config();

// TODO: export server as a module as in this example:
// https://github.com/fastify/fastify-example-todo

// export default(fastify: FastifyInstance, opts: any, next: Function) {
//   fastify
// }

// import fastify, { ServerOptions, Plugin, FastifyInstance } from 'fastify';
// import { Server, IncomingMessage, ServerResponse } from 'http';
// import blipp from 'fastify-blipp';
// import fastifyCaching from 'fastify-caching';
// import fastifyRedis from 'fastify-redis';
// import Redis from 'ioredis';
// import AbstractCache from 'abstract-cache';

// import appConfig from './config/app';
// import redisConfig from './config/redis';

// import * as routes from './routes/index';

// /* Fastify plugin types */

// type FastifyPlugin = Plugin<Server, IncomingMessage, ServerResponse, any>;

// interface FastifyPluginObject {
//   plugin: FastifyPlugin;
//   options: Object;
// }

// type FastifyPlugins = (FastifyPlugin | FastifyPluginObject)[];

// interface FastifyServer {
//   getInstance: () =>FastifyInstance,
//   start: (instance: FastifyInstance, cb: () => any) => void,
//   stop: (instance: FastifyInstance, cb: () => any) => void,
// }

// /* Caching */

// /* istanbul ignore next */
// const fastifyCachePlugins = (): FastifyPlugins => {
//   const redisClient = new Redis(redisConfig.connectionString);

//   return [
//     {
//       plugin: fastifyRedis,
//       options: {
//         client: redisClient,
//       },
//     },
  
//     {
//       plugin: fastifyCaching,
//       options: {
//         cache: new AbstractCache({
//           useAwait: true,
//           driver: {
//             name: 'abstract-cache-redis',
//             options: {
//               client: redisClient,
//               cacheSegment: 'bas-cache',
//             },
//           },
//         }),
//         expiresIn: 5 * 60, // seconds
//         cacheSegment: redisConfig.cacheSegment,
//       },
//     },
//   ];
// }

// const fastifyPlugins = [
//   /* Display the routes table to console at startup */
//   blipp,

//   /* Routes */
//   routes.status,
//   routes.getAccessToken,
//   routes.refreshAccessToken,
// ] as FastifyPlugins;

// /* Registering server plugins */

// const registerPlugins = (fastifyServer: FastifyInstance, fastifyPlugins: FastifyPlugins | null) => {
//   /* istanbul ignore else */ 
//   if (fastifyPlugins) {
//     fastifyPlugins.map((fastifyPlugin) => {
//       (typeof fastifyPlugin === 'function')
//         && fastifyServer.register(fastifyPlugin);

//       /* istanbul ignore next */
//       (fastifyPlugin !== null && 'plugin' in fastifyPlugin && 'options' in fastifyPlugin)
//         && fastifyServer.register(fastifyPlugin.plugin, fastifyPlugin.options);
//     });
//   }
// }

// /* Server invocation */

// const startServer = (fastifyServer: FastifyInstance, cb = () => {}) => {
//   /* istanbul ignore next */
//   if (!appConfig.nodeEnv) throw new Error('Missing env configuration');

//   const plugins = fastifyPlugins;
//   registerPlugins(fastifyServer, plugins);

//   /* istanbul ignore next */
//   redisConfig.enable && registerPlugins(fastifyServer, fastifyCachePlugins());

//   return fastifyServer.listen(appConfig.port, (error) => {
//     if (error) throw error;

//     /* istanbul ignore next */ 
//     if (appConfig.nodeEnv === 'development') {
//       fastifyServer.log.info(`Redis cache enabled: ${redisConfig.enable}`);
//       fastifyServer.log.info(`Node environment: ${appConfig.nodeEnv}`);
//       fastifyServer.blipp();
//     }
//     cb();
//   });
// };

// /* Server termination */

// const stopServer = (fastifyServer: FastifyInstance, cb = () => {}) => fastifyServer.close(cb);

// /* Server instance */

// const buildFastifyInstance = (): FastifyServer => {
//   return {
//     getInstance: () => fastify({
//       logger: appConfig.nodeEnv === 'development' || false,
//     } as ServerOptions),
//     start: (instance: FastifyInstance, cb: () => any) => startServer(instance, cb),
//     stop: (instance: FastifyInstance, cb: () => any) => {
//       stopServer(instance, cb);
//       // tslint:disable-next-line
//       instance = null!;
//     }
//   };
// };

// /* Here we go! */

// export = buildFastifyInstance();
