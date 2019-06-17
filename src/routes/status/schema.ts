const response = {
  200: {
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
  response,
};

export default schema;
