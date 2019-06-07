const responseJsonSchema = {
  200: {
    type: 'object',
    properties: {
      status: { type: 'number' },
      message: { type: 'string' },
      data: {
        type: 'object',
        properties: {
          accessToken: { type: 'string' },
        }
      }
    },
  },
  404: {
    type: 'object',
    properties: {
      status: { type: 'number' },
      message: { type: 'string' },
    },
  },
  400: {
    type: 'object',
    properties: {
      status: { type: 'number' },
      message: { type: 'string' },
    },
  },
  500: {
    type: 'object',
    properties: {
      status: { type: 'number' },
      message: { type: 'string' },
    },
  },
};

const schema = {
  response: responseJsonSchema,
};

export default schema;
