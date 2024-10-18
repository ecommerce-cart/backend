import { object, string } from 'yup'

export const createAddressValidator = object().shape({
  country: string().required(),
  street1: string().required(),
  street2: string().optional(),
  city: string().required(),
  state: string().required(),
  zipCode: string().optional(),
})
