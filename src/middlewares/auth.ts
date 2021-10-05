import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

type TokenPayload = {
  sub: string
  iat: number
  exp: number
}

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, process.env.JWT_SECRET)
    const { sub: id } = decoded as TokenPayload
    req.userId = id

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' })
  }
}
