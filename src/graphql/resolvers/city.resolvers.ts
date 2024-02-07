import prismaClient from '../../clients/prisma.client'

export const cityResolvers = {
  Query: {
    cities: async () => {
      return prismaClient.city.findMany({})
    },
  },
}
