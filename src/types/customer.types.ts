import { InferType } from 'yup'
import { loginCustomerValidator, registerCustomerValidator } from '../validations/customer-validations'

export type RegisterCustomerData = InferType<typeof registerCustomerValidator>
export type LoginCustomerData = InferType<typeof loginCustomerValidator>
