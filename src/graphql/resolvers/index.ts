import { mergeResolvers } from '@graphql-tools/merge'
import { categoryResolvers } from './category.resolvers'
import { productResolvers } from './product.resolvers'
import { customerResolvers } from './customer.resolvers'
import { cartResolvers } from './cart.resolvers'
import { orderResolvers } from './order.resolvers'

export const resolvers = mergeResolvers([
  categoryResolvers,
  productResolvers,
  customerResolvers,
  cartResolvers,
  orderResolvers,
])
