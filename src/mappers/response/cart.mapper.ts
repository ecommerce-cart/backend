import { money } from '../../services/lib/money'
import { Cart, CartProductVariation } from '../../types/models/index.types'

const getMaxVariationPrice = (variations: Array<CartProductVariation>) => {
  return Math.max(...variations.map((v) => v.variation.price))
}
export const cartMapper = (cart: Cart) => {
  let subTotal = 0
  return {
    items: cart && cart.cartProducts
      ? cart.cartProducts.map((cartProduct) => {
          const price =
            getMaxVariationPrice(cartProduct.variations) * cartProduct.quantity
          subTotal += price

          return {
            id: cartProduct.id,
            title: `${cartProduct.product.name} / ${cartProduct.variations
              .map((v) => v.variation.name)
              .join(' / ')}`,
            quantity: cartProduct.quantity,
            price,
            displayedPrice: money(price).egp(),
          }
        })
      : [],
    total: money(subTotal).egp(),
    subTotal: money(subTotal).egp(),
    shipping: 'Free',
  }
}
