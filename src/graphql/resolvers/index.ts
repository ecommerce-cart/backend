import { mergeResolvers } from '@graphql-tools/merge';
import { categoryResolvers } from './category.resolvers'
import { productResolvers } from './product.resolvers';

export const resolvers = mergeResolvers([categoryResolvers, productResolvers]);
