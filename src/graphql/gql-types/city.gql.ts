import { gql } from 'apollo-server'

export const cityTypeDefs = gql`
  type City {
    id: Int!
    name: String!
    country: Country!
  }

  type Query {
    cities: [City]
  }
`
