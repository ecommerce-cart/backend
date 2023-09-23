import { InferType } from 'yup'
import { createProductValidator } from '../validations/product-validations'

export type CreateProductData = InferType<typeof createProductValidator>
