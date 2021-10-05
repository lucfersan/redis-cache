import { Request, Response } from 'express'

import { GetUserInfoService } from '@/services'

export class GetUserInfoController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username } = req.body

    if (!username) {
      return res.status(400).json({ error: 'Username is required.' })
    }

    const getUserInfoService = new GetUserInfoService()

    const user = await getUserInfoService.execute({ username })

    return res.status(200).json(user)
  }
}
