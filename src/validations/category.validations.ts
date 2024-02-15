import { number, object, string } from 'yup'

// Define a schema for the CreateCategoryInput
export const createCategoryValidator = object().shape({
  name: string().trim().required('Category name is required'),
  parent: number().optional(),
})
