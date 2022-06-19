import { HOST, PORT, DEFAULTS, NODE_ENV } from "../common/common.constants";

export default () => ({
  environment: process.env[NODE_ENV] || DEFAULTS.environment,
  host: process.env[HOST] || DEFAULTS.host,
  port: parseInt(process.env[PORT], 10) || DEFAULTS.port,
});
