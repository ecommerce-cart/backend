import { createAddressValidator } from "../../validations/address.validations"
import service from '../../services/domain/address.service'

export const addressResolvers = {
  Mutation: {
    async createAddress(_, { input }, context) {
      await createAddressValidator.validate(input, { abortEarly: false })
      await service.create(input)
      return true
    },
  },
  Query: {
    async addresses() {
      return service.findAll()
    }
  }
}
