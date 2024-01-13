import { gql } from 'apollo-server'

export const mediaTypeDefs = gql`
  type Media {
    id: ID!
    filename: String!
    mimetype: String
    encoding: String
    size: Int
    updatedAt: String
    createdAt: String
  }
`
