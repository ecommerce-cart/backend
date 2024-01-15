import { money } from '../../services/lib/money'
import { variationMapper } from './variation.mapper'
import { Media, Product } from '../../types/models/index.types'

export const getMinMaxPrice = (product: Product) => {
  let minPrice = product.price || 0
  let maxPrice = product.price

  product.productVariationTypes.forEach((pvt) => {
    pvt.variationType.variations.map((v) => {
      if (v.price < minPrice) {
        minPrice = v.price
      }
      if (v.price > maxPrice) {
        maxPrice = product.price
      }
    })
  })

  return [minPrice, maxPrice]
}

const displayPrice = (p: Product) => {
  const [minPrice, maxPrice] = getMinMaxPrice(p)

  return minPrice === maxPrice
    ? `${money(minPrice).egp()}`
    : `From ${minPrice} To ${maxPrice}`
}

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
      variations: pvt.variationType.variations.map(variationMapper),
    })),
  }
}

export const productsMapper = (
  products: Array<Product>,
  images: Record<string, Array<Media>>
) => {
  return products.map((p) => ({
    id: p.id,
    name: p.name,
    images: images[p.id].map((media) => media.url),
  }))
}
