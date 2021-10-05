import { Router } from 'express'

import {
  CreateUserController,
  GetUserInfoController,
  AuthenticateUserController
} from '@/controllers'
import { ensureAuthenticated } from '@/middlewares'

const usersRouter = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const getUserInfoController = new GetUserInfoController()

usersRouter.post('/', createUserController.handle)
usersRouter.post('/login', authenticateUserController.handle)
usersRouter.get('/', ensureAuthenticated, getUserInfoController.handle)

export { usersRouter }
