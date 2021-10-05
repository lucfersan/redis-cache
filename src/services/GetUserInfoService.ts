import { HttpException } from '@/errors'
import { prisma } from '@/prisma'
import { User } from '@prisma/client'

type Params = {
  id: string
}

export class GetUserInfoService {
  async execute({ id }: Params): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      throw new HttpException('User not found.', 404)
    }

    return user
  }
}
