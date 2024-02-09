import { gql } from 'apollo-server'

export const categoryTypeDefs = gql`
  type Category {
    id: Int!
    name: String!
    parent: Category
    children: [Category]
    products: [Product]
  }

  input CreateCategoryInput {
    name: String!
    parent: Int
  }

  type Query {
    categories: [Category]
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category
  }
`
