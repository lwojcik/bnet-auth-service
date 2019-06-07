/**
 * @file    Battle.net configuration file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2018-06-19
 */

const bnetConfig = {
  region: process.env.API_BATTLENET_REGION!,
  /** Battle.net API key */
  apiKey: process.env.API_BATTLENET_KEY!,
  /** Battle.net API secret */
  apiSecret: process.env.API_BATTLENET_SECRET!,
};

export default bnetConfig;
