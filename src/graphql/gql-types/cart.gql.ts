import { gql } from 'apollo-server'

export const cartTypeDefs = gql`
  type CartItem {
    id: Int!
    title: String!
    quantity: Int!
    price: Int!
    displayedPrice: String!
  }
  type Cart {
    items: [CartItem]!
    total: String!
    subTotal: String!
    shipping: String!
  }

  type Query {
    showCart: Cart!
  }

  input AddToCartInput {
    productId: Int!
    variations: [Int]!
    quantity: Int!
  }

  input UpdateCartQuantityInput {
    cartProductId: Int!
    quantity: Int!
  }

  input DeleteCartProductInput {
    cartProductId: Int!
  }

  type Mutation {
    addToCart(input: AddToCartInput!): Boolean
    updateCartQuantity(input: UpdateCartQuantityInput!): Boolean
    deleteCartProduct(input: DeleteCartProductInput!): Boolean
  }
`
