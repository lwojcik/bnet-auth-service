const querystring = {
  refresh: { type: 'string' },
}

const response = {
  200: {
    type: 'object',
    properties: {
      status: { type: 'number' },
      data: {
        type: 'object',
        properties: {
          accessToken: { type: 'string' }
        },
      },
    },
  },
  400: {
    type: 'object',
    properties: {
      status: { type: 'number' },
    },
  },
  500: {
    type: 'object',
    properties: {
      status: { type: 'number' },
    },
  },
};

const schema = {
  querystring,
  response,
};

export default schema;
