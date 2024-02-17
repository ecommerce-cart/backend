import prismaClient from '../../clients/prisma.client'

export const addToCart = async ({
  productId,
  variations,
  quantity,
  customerId,
}: {
  productId: number
  variations: Array<number>
  quantity: number
  customerId: number
}) => {
  let cart = await prismaClient.cart.findFirst({
    where: {
      customerId,
    },
  })

  if (!cart) {
    cart = await prismaClient.cart.create({
      data: { customerId },
    })
  }

  await prismaClient.cartProduct.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
      variations: {
        createMany: {
          data: variations.map((variationId) => ({ variationId })),
        },
      },
    },
  })
}

export const updateCartQuantity = async ({ cartProductId, quantity }: { cartProductId: number; quantity: number }) => {
  await prismaClient.cartProduct.update({
    where: {
      id: cartProductId,
    },
    data: {
      quantity,
    },
  })

  return true
}

export const deleteCartProduct = async ({ cartProductId }: { cartProductId: number }) => {
  await prismaClient.cartProduct.delete({
    where: {
      id: cartProductId,
    },
  })
  return true
}

export default {
  addToCart,
  updateCartQuantity,
  deleteCartProduct,
}
