import { InferType } from "yup";
import productService from "../../services/product.service"
import { createProductValidator } from "../../validations/product-validations"


export const productResolvers = {
  Mutation: {
    async createProduct(_, { input }) {
      await createProductValidator.validate(input, { abortEarly: false })
      return productService.create(input)
    },
  },
}
