type EndpointInfo = {
  url: string;
  method: string;
};

interface MainDefaultResponse {
  statusCode: 200;
  data: {
    name: string;
    version: string;
    caching: boolean;
    endpoints: {
      status: EndpointInfo;
      accesstoken: EndpointInfo;
      accesstokenrefresh: EndpointInfo;
    };
  };
}

export const mainDefaultResponse: MainDefaultResponse = {
  statusCode: 200,
  data: {
    name: 'bnet-auth-service',
    version: '2.0.0',
    caching: true,
    endpoints: {
      status: {
        url: '/status',
        method: 'GET',
      },
      accesstoken: {
        url: '/accesstoken',
        method: 'GET',
      },
      accesstokenrefresh: {
        url: '/accesstoken?refresh=true',
        method: 'GET',
      },
    },
  },
};
