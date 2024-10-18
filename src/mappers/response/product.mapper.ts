import { money } from '../../services/lib/money'
import { productVariationMapper } from './variation.mapper'
import { Media, Product } from '../../types/models/index.types'

export const productMapper = async (p: Product, images: Array<Media>) => {
  return {
    id: p.id,
    name: p.name,
    images: images.map((media) => media.url),
    // price: displayPrice(p),
    price: p.price,
    displayedPrice: money(p.price).egp(),
    variationTypes: p.productVariationTypes.map((pvt) => ({
      id: pvt.variationTypeId,
      name: pvt.variationType.name,
      component: pvt.variationType.component,
      variations: pvt.productVariations.map(productVariationMapper),
    })),
  }
}

export const productsMapper = (products: Array<Product>, images: Record<string, Array<Media>>) => {
  return products.map((p) => ({
    id: p.id,
    name: p.name,
    images: images[p.id].map((media) => media.url),
  }))
}
