import { FastifyInstance } from 'fastify'
import { signUp } from './sign-up'
import { signIn } from './sign-in'
import { getProfile } from './get-profile'

import { verifyJWT } from '../middleware/verify-jwt'

export async function UserRoutes(app: FastifyInstance) {
  app.post('/signup', signUp)
  app.post('/signin', signIn)

  app.get('/signin/user', { onRequest: [verifyJWT] }, getProfile)
}
