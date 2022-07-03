import { BlizzAPI, RegionName, RegionNameEnum } from 'blizzapi';

export const validateRegionName = (value: string) => {
  const allowedRegionNames = BlizzAPI.getAllRegionNames()
    .filter((region) => region !== RegionNameEnum.tw)
    .join(', ');

  const validRegionName = BlizzAPI.validateRegionName(value as RegionName);

  if (!validRegionName) {
    throw new RangeError(
      `'${value}' is not a valid Battle.net region. Available regions: ${allowedRegionNames}`
    );
  }
  return validRegionName;
};
