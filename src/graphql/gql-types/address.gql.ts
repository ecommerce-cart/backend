import { gql } from 'apollo-server'

export const addressTypeDefs = gql`
  type Address {
    id: ID!
    street1: String!
    street2: String
    state: String!
    city: City!
    country: Country!
    zipCode: String
    default: Boolean
  }

  input CreateAddressInput {
    street1: String!
    street2: String
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
