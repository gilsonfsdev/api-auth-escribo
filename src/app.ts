import fastify from 'fastify'
import { UserRoutes } from './controllers/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '30m',
  },
})

app.register(UserRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Aqui deveria fazer um log para uma ferramenta externa como DataDog/NewRelic
  }
  return reply.status(500).send({ message: 'Interval Server Error' })
})
