import { gql } from 'apollo-server'

export const productTypeDefs = gql`
  type Variation {
    id: Int!
    name: String!
    value: String
    price: Int!
    quantity: Int!
    type: Type
    parent: Variation
    parentId: Int
    typeId: Int
    typeName: String
  }
  type VariationType {
    id: Int!
    name: String!
    component: String!
    variations: [Variation]
  }
  type Type {
    id: String
    name: String
    component: String
  }
  type Product {
    id: Int!
    name: String!
    price: String!
    variationTypes: [VariationType]
    images: [String]
    description: String
    details: String
    categories: [Category]
    updatedAt: String
    createdAt: String
  }

  input CreateProductInput {
    name: String!
    categories: [Int]
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }
`
