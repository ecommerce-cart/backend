import _ from 'lodash'

import { productMapper, productsMapper } from '../../mappers/response/product.mapper'
import prismaClient from '../../clients/prisma.client'
import { Product } from '../../types/models/index.types'

const prisma = prismaClient

export const create = async (data) => {
  data.categories = data.categories || []

  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: '',
      details: '',
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

export const getAll = async () => {
  const products = await prisma.product.findMany({})

  const productIds = products.map((p) => p.id)

  const images = await prisma.media.findMany({
    where: {
      objectId: {
        in: productIds,
      },
    },
  })

  const imagesGroupedByObjectId = _.groupBy(images, 'objectId')

  return productsMapper(products as Array<Product>, imagesGroupedByObjectId)
}

export const getProductById = async (id: number) => {
  const product = await prisma.product.findFirst({
    where: {
      id,
    },
    include: {
      productVariationTypes: {
        include: {
          productVariations: {
            include: {
              children: {
                select: {
                  id: true,
                },
              },
              productVariationType: true,
              availableStock: true,
              variation: true,
            },
          },
          variationType: true,
        },
      },
    },
  })

  const images = await prisma.media.findMany({
    where: {
      objectId: id,
    },
  })

  return productMapper(product as Product, images)
}
