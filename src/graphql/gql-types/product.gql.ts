export const productTypeDefs = `#graphql
type Product {
  id: Int!
  name: String!
  createdAt: String
  updatedAt: String
  categories: [Category]
}

input CreateProductInput {
  name: String!
  categories: [Int]
}

type Mutation {
  createProduct(input: CreateProductInput!): Product
}
`
