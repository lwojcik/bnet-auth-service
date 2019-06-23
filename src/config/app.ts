/**
 * @file    App configuration file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2018-06-19
 */

const appConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',
  /** Node.js app port */
  port: process.env.API_NODE_PORT || '8881',
};

export default appConfig;
