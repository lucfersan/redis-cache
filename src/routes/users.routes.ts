import { Router } from 'express'

import {
  CreateUserController,
  GetUserInfoController,
  AuthenticateUserController
} from '@/controllers'

const usersRouter = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const getUserInfoController = new GetUserInfoController()

usersRouter.post('/', createUserController.handle)
usersRouter.post('/login', authenticateUserController.handle)
usersRouter.get('/', getUserInfoController.handle)

export { usersRouter }
