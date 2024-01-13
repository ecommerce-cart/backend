import { Variation } from '../../types/models/index.types'

export const variationMapper = (variation: Variation) => {
  return {
    id: variation.id,
    value: variation.value,
    name: variation.name,
    price: variation.price,
    quantity: variation.availableStock.quantity,
    typeId: variation.typeId,
    parentId: variation.parentId,
  }
}
