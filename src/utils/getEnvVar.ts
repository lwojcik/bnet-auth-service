interface GetEnvVarArgument {
  appPrefix?: string;
  featurePrefix?: string;
  property: string;
}

export const getEnvVar = ({
  appPrefix,
  featurePrefix,
  property,
}: GetEnvVarArgument) =>
  `${appPrefix ? `${appPrefix}_` : ''}${
    featurePrefix ? `${featurePrefix}_` : ''
  }${property.toUpperCase()}`;
