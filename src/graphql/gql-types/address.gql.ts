import { gql } from 'apollo-server'

export const addressTypeDefs = gql`
  type Address {
    id: ID!
    street: String!
    state: String!
    city: City!
    zipcode: String
    default: Boolean
  } 

  input CreateAddressInput {
    address: String!
    city: String!
    country: String!
    state: String!
    zipCode: String
  }

  type Mutation {
    createAddress(input: CreateAddressInput!): Boolean
  }

  type Query {
    addresses: [Address]!
  }
`
