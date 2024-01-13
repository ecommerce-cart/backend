import service from '../../services/domain/order.service'
export const orderResolvers = {
  Query: {
    async orders() {
      return service.customerOrders(1)
    },
  },
  Mutation: {
    async createOrder() {
      await service.createOrder()
      return true
    },
  },
}
