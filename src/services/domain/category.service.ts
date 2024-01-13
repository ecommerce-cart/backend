import { PrismaClient } from '@prisma/client'
import { CreateCategoryData } from '../../types/category.types'

const prisma = new PrismaClient()

const create = async (data: CreateCategoryData) => {
  const category = await prisma.category.create({
    data: {
      name: data.name,
      parent: {
        connect: {
          id: Number(data.parent),
        },
      },
    },
    include: {
      children: true,
      parent: true
    },
  })

  return category
}

export default {
  create,
}
