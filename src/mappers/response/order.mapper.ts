import { Order } from '../../types/models/index.types'
import moment from 'moment'

export const ordersMapper = (orders: Array<Order>) => {
  return orders.map((o) => ({
    id: o.id,
    status: 'Pending',
    createdAt: moment(o.createdAt).calendar(),
    updatedAt: moment(o.updatedAt).calendar(),
  }))
}
