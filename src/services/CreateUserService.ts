import { HttpException } from '@/errors'
import { prisma } from '@/prisma'
import { User } from '@prisma/client'

type Params = {
  username: string
  firstName: string
  lastName: string
}

export class CreateUserService {
  async execute(params: Params): Promise<User> {
    const exists = await prisma.user.findUnique({
      where: { username: params.username }
    })

    if (exists) {
      throw new HttpException('User already exists', 409)
    }

    const user = await prisma.user.create({ data: params })

    return user
  }
}
