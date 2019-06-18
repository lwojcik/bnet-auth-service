// tslint:disable-next-line variable-name
const IORedis: any = jest.genMockFromModule('ioredis')

IORedis.prototype.get.mockImplementation(({}, callback:Function) => {
 callback(null, IORedis.mockResponse.get.shift() || null)
})

export default IORedis;