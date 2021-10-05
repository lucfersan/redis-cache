import { User } from '.prisma/client'

import { HttpException } from '@/errors'
import { prisma } from '@/prisma'

type Params = {
  username: string
}

export class GetUserInfoService {
  async execute({ username }: Params): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) {
      throw new HttpException('User not found.', 404)
    }

    return user
  }
}