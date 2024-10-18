import { InferType } from 'yup'
import prisma from '../../clients/prisma.client'
import { createAddressValidator } from '../../validations/address.validations'
import { addressesMapper } from '../../mappers/response/address.mapper'
import { Address } from '../../types/models/index.types'

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
      street1: data.street1,
      street2: data.street2,
      cityId: Number(data.city),
      countryId: Number(data.country),
      customerId,
      zipCode: data.zipCode,
    },
  })
}

const findAll = async () => {
  return prisma.address.findMany({
    include: {
      city: true,
      country: true,
    },
  })
}

const findManyBy = async (key: 'customerId' | 'id', value: string) => {
  const addresses = await prisma.address.findMany({
    where: {
      [key]: value,
    },
    include: {
      city: true,
      country: true,
      customer: true,
    },
  })

  // FIXME: This is a bad practice, you should not cast the object like this
  return addressesMapper(addresses as unknown as Array<Address>)
}

export default {
  create,
  findAll,
  findManyBy,
}
