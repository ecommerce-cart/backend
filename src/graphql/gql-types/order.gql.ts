import { gql } from 'apollo-server'

export const orderTypeDefs = gql`
  type Order {
    id: ID!
    status: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    orders: [Order!]
  }

  type Mutation {
    createOrder: Boolean
  }
`
