import prisma from '../../clients/prisma.client'
import { cartMapper } from '../../mappers/response/cart.mapper'
import service from '../../services/domain/cart.service'
import { Cart } from '../../types/models/index.types'

export const cartResolvers = {
  Query: {
    async showCart() {
      const cart = await prisma.cart.findFirst({
        where: {
          customerId: 1,
        },
        include: {
          cartProducts: {
            include: {
              product: true,
              variations: {
                include: {
                  variation: true,
                },
              },
            },
          },
        },
      })

      return cartMapper(cart as Cart)
    },
  },
  Mutation: {
    async addToCart(_, { input }) {
      await service.addToCart(input)
      return true
    },
    async updateCartQuantity(_, { input }) {
      await service.updateCartQuantity(input)
      return true
    },
    async deleteCartProduct(_, { input }) {
      await service.deleteCartProduct(input)
      return true
    },
  },
}
