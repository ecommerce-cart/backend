import { GraphQLError } from 'graphql'
import {
  getCustomerBy,
  loginCustomer,
  registerCustomer,
} from '../../services/domain/customer.service'
import {
  loginCustomerValidator,
  registerCustomerValidator,
} from '../../validations/customer-validations'
import { MyContext } from '../context/context'
import { generateAccessToken } from '../../services/lib/jwt.service'

export const customerResolvers = {
  Query: {
    meCustomer: (_, __, context: Required<MyContext>) => {
      return getCustomerBy('email', context.customer.email)
    },
  },
  Mutation: {
    async registerCustomer(_, { input }, context) {
      await registerCustomerValidator.validate(input, { abortEarly: false })
      const customerData = await registerCustomer(input)
      context.res.cookie('refresh-token', customerData.refreshToken, {
        httpOnly: true,
      })
      return customerData
    },
    async loginCustomer(_, { input }, context) {
      await loginCustomerValidator.validate(input, { abortEarly: false })
      const customerData = await loginCustomer(input)

      context.res.cookie('refresh-token', customerData.refreshToken, {
        httpOnly: true,
      })

      return customerData
    },
    async logoutCustomer(_, __, context) {
      context.res.cookie('refresh-token', null, {
        httpOnly: true,
        expires: new Date(0),
      })

      return true
    },
    async refreshToken(_, __, { req }: { req }) {
      const refreshToken = req.cookies['refresh-token']

      console.log('refreshToken', refreshToken)

      if (refreshToken) {
        try {
          const customer = await getCustomerBy('refreshToken', refreshToken)
          const accessToken = generateAccessToken({ email: customer.email })
          return { ...customer, accessToken }
        } catch (e) {}
      }

      throw new GraphQLError('Authentication required', {
        extensions: {
          code: 'INVALID_REFRESH_TOKEN',
        },
      })
    },
  },
}
