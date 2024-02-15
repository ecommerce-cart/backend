import prisma from '../../clients/prisma.client'
import { cartMapper } from '../../mappers/response/cart.mapper'
import service from '../../services/domain/cart.service'
import { Cart } from '../../types/models/index.types'
import { 
  addToCartValidator, 
  deleteCartProductValidator, 
  updateCartValidator 
} from '../../validations/cart.validation'

export const cartResolvers = {
  Query: {
    async showCart(_, __, context) {
      const cart = await prisma.cart.findFirst({
        where: {
          customerId: context.customer.id,
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
      await addToCartValidator.validate(input, { abortEarly: false })
      await service.addToCart(input)
      return true
    },
    async updateCartQuantity(_, { input }) {
      await updateCartValidator.validate(input, { abortEarly: false })
      await service.updateCartQuantity(input)
      return true
    },
    async deleteCartProduct(_, { input }) {
      await deleteCartProductValidator.validate(input, { abortEarly: false })
      await service.deleteCartProduct(input)
      return true
    },
  },
}
