import { Request, Response } from 'express'

import { GetUserInfoService } from '@/services'

export class GetUserInfoController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.userId

    const getUserInfoService = new GetUserInfoService()

    const user = await getUserInfoService.execute({ id })

    return res.status(200).json(user)
  }
}
