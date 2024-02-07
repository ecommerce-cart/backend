import { object, string } from 'yup'

export const createAddressValidator = object().shape({
  country: string().required(),
  address: string().required(),
  city: string().required(),
  state: string().required(),
  zipCode: string().optional(),
})
