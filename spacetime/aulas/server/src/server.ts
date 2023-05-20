import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

// Cors
app.register(cors, {
  origin: true, // All urls
})

app.register(memoriesRoutes)

app
  .listen({
    host: '0.0.0.0',
    port: 8080,
  })
  .then(() => {
    console.log('HTTP server running on http://0.0.0.0:8080')
  })
