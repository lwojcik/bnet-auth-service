const response = {
  200: {
    type: "object",
    properties: {
      status: { type: "number" },
      message: { type: "string" },
    },
  },
  400: {
    type: "object",
    properties: {
      status: { type: "number" },
      message: { type: "string" },
    },
  },
  500: {
    type: "object",
    properties: {
      status: { type: "number" },
      message: { type: "string" },
    },
  },
};

const schema = {
  response,
};

export default schema;
