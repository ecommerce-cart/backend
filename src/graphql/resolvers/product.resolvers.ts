import { create, getAll, getProductById } from '../../services/domain/product.service'
import { createProductValidator } from '../../validations/product-validations'

export const productResolvers = {
  Mutation: {
    async createProduct(_, { input }) {
      await createProductValidator.validate(input, { abortEarly: false })
      return create(input)
    },
  },
  Query: {
    async products() {
      return getAll()
    },
    async product(_, { id }) {
      return getProductById(+id)
    },
  },
}
