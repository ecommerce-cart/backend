import { gql } from 'apollo-server'

export const countryTypeDefs = gql`
  type Country {
    id: Int!
    name: String!
  }
`
