import { Request, Response } from 'express'

import { getRedis } from '@/redis'
import { GetUserInfoService } from '@/services'

export class GetUserInfoController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.userId

    const getUserInfoService = new GetUserInfoService()

    let user: any

    console.time()
    const userRedis = await getRedis(`userId-${id}`)
    if (userRedis) {
      user = JSON.parse(userRedis)
    } else {
      user = await getUserInfoService.execute({ id })
    }
    console.timeEnd()

    return res.status(200).json(user)
  }
}
