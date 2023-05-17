import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()

app.get('/users', async () => {
  const users = await prisma.user.findMany()
  return users
})

app
  .listen({
    host: '0.0.0.0',
    port: 8080,
  })
  .then(() => {
    console.log('HTTP server running on http://0.0.0.0:8080')
  })
