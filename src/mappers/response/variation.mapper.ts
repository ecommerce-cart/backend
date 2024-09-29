import { ProductVariation } from '../../types/models/index.types'

export const productVariationMapper = (productVariation: ProductVariation) => {
  return {
    id: productVariation.id,
    value: productVariation.variation.value,
    name: productVariation.variation.name,
    price: productVariation.price,
    quantity: productVariation.availableStock.quantity || 0,
    typeId: productVariation.productVariationType.id,
    parentId: productVariation.parentId,
    children: productVariation.children,
  }
}
