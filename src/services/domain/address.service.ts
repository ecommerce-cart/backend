import { InferType } from 'yup'
import prisma from '../../clients/prisma.client'
import { createAddressValidator } from '../../validations/address.validations'

const create = async (
  data: InferType<typeof createAddressValidator>
) => {
  const customerId = 1
  await prisma.address.updateMany({
    where: {
      customerId
    },
    data: {
      default: false
    }
  })
  return prisma.address.create({
    data: {
      state: data.state,
      street: data.address,
      cityId: Number(data.city),
      customerId,
      zipcode: data.zipCode,
    },
  })
}

const findAll = async () => {
  return prisma.address.findMany({
    include: {
      city: {
        include: {
          country: true
        }
      }
    }
  })
}

export default {
  create,
  findAll
}
