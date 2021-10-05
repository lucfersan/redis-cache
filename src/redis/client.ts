import Redis from 'ioredis'
import { promisify } from 'util'

const redis = new Redis()

const getRedis = (value: string): any => {
  const asyncRedisGet = promisify(redis.get).bind(redis)
  return asyncRedisGet(value)
}

const setRedis = (key: string, value: string): any => {
  const asyncRedisSet = promisify(redis.set).bind(redis)
  return asyncRedisSet(key, value)
}

export { redis, getRedis, setRedis }
