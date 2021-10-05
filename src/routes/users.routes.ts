import { Router } from 'express'

import { CreateUserController, GetUserInfoController } from '@/controllers'

const usersRouter = Router()

const createUserController = new CreateUserController()
const getUserInfoController = new GetUserInfoController()

usersRouter.post('/', createUserController.handle)
usersRouter.get('/', getUserInfoController.handle)

export { usersRouter }
