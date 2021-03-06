import { Router } from 'express'

import { usersRouter } from '@/routes/users.routes'

const router = Router()

router.use('/users', usersRouter)

export { router }
