import { config } from 'dotenv-flow'
import express, { NextFunction, Request, Response } from 'express'

import 'express-async-errors'
import { HttpException } from '@/errors'
import { router } from '@/routes'

config({ silent: true })

const app = express()

app.use(express.json())
app.use(router)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof HttpException) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })
})

app.listen(3333, () => console.log('Server started on port 3333 🔥'))
