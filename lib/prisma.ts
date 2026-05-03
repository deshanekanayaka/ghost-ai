import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? ''
  return new PrismaClient({ adapter: new PrismaPg(url) })
}

export const prisma = global.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
