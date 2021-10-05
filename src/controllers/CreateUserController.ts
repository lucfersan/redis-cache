import { Request, Response } from 'express'

import { CreateUserService } from '@/services'

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, firstName, lastName } = req.body

    const createUserService = new CreateUserService()

    const user = await createUserService.execute({
      username,
      firstName,
      lastName
    })

    return res.status(201).json(user)
  }
}
