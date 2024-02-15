import prismaClient from '../../clients/prisma.client'
import { ordersMapper } from '../../mappers/response/order.mapper'
import { Order } from '../../types/models/index.types'

export const createOrder = async () => {
  /**
   * FIXME:
   * We don't need the customerId as we will use the customer info in the order
   */
  const customerId = 1

  const cart = await prismaClient.cart.findFirst({
    where: {
      customerId,
    },
  })

  if (!cart) {
    throw new Error('The cart is empty')
  }

  const fullCart = await prismaClient.cart.findFirst({
    where: {
      id: cart.id,
    },
    include: {
      cartProducts: {
        include: {
          variations: true,
        },
      },
    },
  })

  await prismaClient.order.create({
    data: {
      customerId,
      orderProducts: {
        create: fullCart.cartProducts.map((cp) => ({
          productId: cp.productId,
          quantity: cp.quantity,
          orderVariations: {
            create: cp.variations.map((v) => ({
              variationId: v.variationId,
            })),
          },
        })),
      },
    },
  })

  await prismaClient.cart.delete({
    where: {
      customerId,
    },
  })

  return true
}

export const customerOrders = async (customerId: number) => {
  const orders = await prismaClient.order.findMany({
    include: {
      orderStatuses: true,
    },
    where: {
      customerId,
    },
  })

  return ordersMapper(orders as Array<Order>)
}

export default {
  createOrder,
  customerOrders,
}
