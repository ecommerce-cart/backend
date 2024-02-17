import { Customer } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { LoginCustomerData, RegisterCustomerData } from '../../types/customer.types'
import { GraphQLError } from 'graphql'
import { generateAccessToken, generateRefreshToken } from '../lib/jwt.service'
import prismaClient from '../../clients/prisma.client'

const prisma = prismaClient

export const getCustomerBy = (by: 'id' | 'name' | 'email' | 'refreshToken', value: string) =>
  prisma.customer.findFirst({
    where: {
      [by]: value,
    },
  })

export const registerCustomer = async (data: RegisterCustomerData): Promise<Customer & { accessToken: string }> => {
  const customer = await createCustomer(data)
  return {
    ...customer,
    accessToken: generateAccessToken({ email: customer.email }),
    refreshToken: customer.refreshToken,
  }
}

export const loginCustomer = async ({
  email,
  password,
}: LoginCustomerData): Promise<Partial<Customer & { accessToken: string }>> => {
  const customer = await prisma.customer.findFirst({
    where: {
      email,
    },
  })

  if (!customer) {
    throw new GraphQLError('Email or password is not correct', {
      extensions: {
        code: 'INVALID_DATA',
      },
    })
  }

  const passwordMatches = await bcrypt.compare(password, customer.password)

  if (!passwordMatches) {
    throw new GraphQLError('Email or password is not correct', {
      extensions: {
        code: 'INVALID_DATA',
      },
    })
  }

  return {
    ...customer,
    accessToken: jwt.sign({ email }, 'secret', { expiresIn: 30 }),
  }
}

export const createCustomer = async ({ name, email, phone, password }: RegisterCustomerData) => {
  const customerExists = await prisma.customer.findFirst({
    where: {
      email,
    },
  })

  if (customerExists) {
    throw new GraphQLError('The customer with this email is already exists', {
      extensions: {
        code: 'NOT_UNIQUE_EMAIL',
      },
    })
  }

  const pass = await bcrypt.hash(password, 10)

  return prisma.customer.create({
    data: {
      name,
      email,
      phone,
      password: pass,
      refreshToken: generateRefreshToken({ email: email }),
    },
  })
}
