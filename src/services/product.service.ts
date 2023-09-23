import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })

export const create = async (data) => {
  data.categories = data.categories || []

  const product = await prisma.product.create({
    data: {
      name: data.name,
    },
  })

  const productCategories = data.categories.map((categoryId: number) => ({
    categoryId,
    productId: product.id,
  }))

  await prisma.productCategory.createMany({
    data: productCategories,
  })

  const res = await prisma.product.findFirst({
    where: {
      id: product.id,
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  })

  return { ...res, categories: res.categories.map((cat) => cat.category) }
}

export default {
  create,
}
