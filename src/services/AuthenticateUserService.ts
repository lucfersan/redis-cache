import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { HttpException } from '@/errors'
import { prisma } from '@/prisma'

type Params = {
  username: string
  password: string
}

export class AuthenticateUserService {
  async execute({ username, password }: Params): Promise<{ token: string }> {
    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) {
      throw new HttpException('Incorrect Username or Password.', 401)
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new HttpException('Incorrect Username or Password.', 401)
    }

    const token = sign({}, process.env.JWT_SECRET, {
      expiresIn: '1d',
      subject: user.id
    })

    return { token }
  }
}
