import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })
    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.converUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
      }
    })
  })
  app.get('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return memory
  })
  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      converUrl: z.string(),
      isPublic: z.coerce.boolean().default(false), // coerce convert the value to equivalent in true or false
    })

    const { content, converUrl, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        converUrl,
        isPublic,
        userId: '6083458c-b7b0-4b10-b29d-ec459ca20ba1',
      },
    })

    return memory
  })
  app.put('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      converUrl: z.string(),
      isPublic: z.coerce.boolean().default(false), // coerce convert the value to equivalent in true or false
    })

    const { content, converUrl, isPublic } = bodySchema.parse(request.body)

    const memoryUpdated = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        converUrl,
        isPublic,
      },
    })

    return memoryUpdated
  })
  app.delete('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
