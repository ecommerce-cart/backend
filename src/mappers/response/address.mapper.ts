import { Address } from '../../types/models/index.types'

export const addressesMapper = (addresses: Address[]) =>
  addresses.map((address) => ({
    id: address.id,
    street1: address.street1,
    street2: address.street2,
    city: address.city,
    country: address.country,
    state: address.state,
    zipCode: address.zipCode,
    default: address.default,
  }))
