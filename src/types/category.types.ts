import { InferType } from 'yup'
import { createCategoryValidator } from '../validations/category-validations'

export type CreateCategoryData = InferType<typeof createCategoryValidator>
