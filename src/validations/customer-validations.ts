import { object, string } from 'yup'

export const registerCustomerValidator = object().shape({
  name: string().trim().required(),
  password: string().required().min(3),
  email: string().required().email(),
  phone: string().required(),
})

export const loginCustomerValidator = object().shape({
  email: string().required().email(),
  password: string().required().min(3),
})
