import { InferType } from 'yup'
import prisma from '../../clients/prisma.client'
import { createAddressValidator } from '../../validations/address.validations'

const create = async (data: InferType<typeof createAddressValidator>, customerId: number) => {
  await prisma.address.updateMany({
    where: {
      customerId,
    },
    data: {
      default: false,
    },
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
          country: true,
        },
      },
    },
  })
}

const findManyBy = async (key: 'customerId' | 'id', value: string) => {
  return prisma.address.findMany({
    where: {
      [key]: value,
    },
    include: {
      city: {
        include: {
          country: true,
        },
      },
    },
  })
}

export default {
  create,
  findAll,
  findManyBy,
}
