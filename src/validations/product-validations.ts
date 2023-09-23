import { array, number, object, string } from 'yup'

// Define a schema for the CreateProductInput
export const createProductValidator = object().shape({
  name: string().trim().required('Product name is required'),
  categories: array().of(number()),
})
