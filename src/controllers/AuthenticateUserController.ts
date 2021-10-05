import { Request, Response } from 'express'

import { setRedis } from '@/redis'
import { AuthenticateUserService } from '@/services'

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Please fill all fields.' })
    }

    const authenticateUserService = new AuthenticateUserService()

    const { token, user } = await authenticateUserService.execute({
      username,
      password
    })

    await setRedis(`userId-${user.id}`, JSON.stringify(user))

    return res.status(201).json({
      token,
      user
    })
  }
}
