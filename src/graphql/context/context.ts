import { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone'
import { IncomingMessage } from 'http'
import jwt from 'jsonwebtoken'

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
      return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
    } catch (e) {}
  }

  return null
}

export const context = async ({
  req,
  res,
}: StandaloneServerContextFunctionArgument) => {
  return {
    customer: getCustomer(req),
    req,
    res,
  }
}
