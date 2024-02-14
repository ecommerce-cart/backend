import { createAddressValidator } from '../../validations/address.validations'
import service from '../../services/domain/address.service'

export const addressResolvers = {
  Mutation: {
    async createAddress(_, { input }, context) {
      await createAddressValidator.validate(input, { abortEarly: false })
      await service.create(input, context.customer.id)
      return true
    },
  },
  Query: {
    async addresses(_, __, context) {
      return service.findManyBy('customerId', context.customer.id)
    },
  },
}
