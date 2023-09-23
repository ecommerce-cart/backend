import { mergeTypeDefs } from '@graphql-tools/merge'
import { categoryTypeDefs } from './category.gql'
import { productTypeDefs } from './product.gql'

export const typeDefs = mergeTypeDefs([categoryTypeDefs, productTypeDefs])
