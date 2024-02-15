import { PrismaClient } from '@prisma/client'
import { createCategoryValidator } from '../../validations/category.validations'
import CategoryService from '../../services/domain/category.service'
import { GraphQLError } from 'graphql'
const prisma = new PrismaClient()

export const categoryResolvers = {
  Query: {
    categories: async (_, __, { customer }) => {
      // if (!customer) {
      //   throw new GraphQLError('Authentication required', {
      //     extensions: { code: 'UNAUTHENTICATED' },
      //   })
      // }

      return prisma.category.findMany({
        include: {
          children: true,
        },
      })
    },
  },
  Mutation: {
    async createCategory(_, { input }) {
      await createCategoryValidator.validate(input, { abortEarly: false })
      return CategoryService.create(input)
    },
  },
}
