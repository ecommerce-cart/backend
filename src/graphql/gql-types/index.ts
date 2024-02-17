import { mergeTypeDefs } from '@graphql-tools/merge'
import { categoryTypeDefs } from './category.gql'
import { productTypeDefs } from './product.gql'
import { mediaTypeDefs } from './media.gql'
import { customerTypeDefs } from './customer.gql'
import { cartTypeDefs } from './cart.gql'
import { orderTypeDefs } from './order.gql'
import { cityTypeDefs } from './city.gql'
import { addressTypeDefs } from './address.gql'
import { countryTypeDefs } from './country.gql'

export const typeDefs = mergeTypeDefs([
  categoryTypeDefs,
  productTypeDefs,
  cartTypeDefs,
  mediaTypeDefs,
  customerTypeDefs,
  orderTypeDefs,
  countryTypeDefs,
  cityTypeDefs,
  addressTypeDefs,
])
