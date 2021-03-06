import { Request, Response } from 'express'

import { CreateUserService } from '@/services'

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, firstName, lastName, password } = req.body

    if (!username || !firstName || !lastName || !password) {
      return res.status(400).json({ error: 'Please fill all fields.' })
    }

    const createUserService = new CreateUserService()

    const user = await createUserService.execute({
      username,
      firstName,
      lastName,
      password
    })

    return res.status(201).json(user)
  }
}
