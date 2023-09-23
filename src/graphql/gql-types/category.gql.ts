export const categoryTypeDefs = `#graphql
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
  hello: String
  categories: [Category]
}

type Mutation {
    createCategory(input: CreateCategoryInput!): Category
}
`
