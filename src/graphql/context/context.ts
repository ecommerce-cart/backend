import { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone'
import { IncomingMessage } from 'http'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getCustomerBy } from '../../services/domain/customer.service'
export interface MyContext {
  // You can optionally create a TS interface to set up types
  // for your contextValue
  customer?: { email: string }
  req?: IncomingMessage
}

const getCustomer = (req: IncomingMessage) => {
  const authorizationHeader = req.headers.authorization || ''
  const token = authorizationHeader.replace('Bearer ', '')

  // console.log('token', token)

  if (token) {
    try {
      const data = jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET
      ) as JwtPayload
      return getCustomerBy('email', data.email)
    } catch (e) {}
  }

  return null
}

export const context = async ({
  req,
  res,
}: StandaloneServerContextFunctionArgument) => {
  return {
    customer: await getCustomer(req),
    req,
    res,
  }
}
