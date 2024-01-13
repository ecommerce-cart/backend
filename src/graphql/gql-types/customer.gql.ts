import { gql } from 'apollo-server'

export const customerTypeDefs = gql`
  type Customer {
    id: ID!
    name: String!
    email: String!
    phone: String!
    accessToken: String
    createdAt: String!
    updatedAt: String!
  }

  input RegisterCustomerInput {
    name: String!
    email: String!
    password: String!
    phone: String!
  }

  input LoginCustomerInput {
    email: String!
    password: String!
  }

  type Query {
    meCustomer: Customer
  }

  type Mutation {
    registerCustomer(input: RegisterCustomerInput!): Customer
    loginCustomer(input: LoginCustomerInput!): Customer
    refreshToken: Customer
  }
`
