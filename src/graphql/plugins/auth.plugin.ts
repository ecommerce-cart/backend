import { ApolloServerPlugin } from '@apollo/server'
import { GraphQLError } from 'graphql'
import { MyContext } from '../context/context'

export const authPlugin: ApolloServerPlugin<MyContext> = {
  // This function runs before the resolver execution
  async requestDidStart() {
    return {
      async didResolveOperation({ operationName, contextValue }) {
        // Specify the queries/mutations that require authentication
        const protectedQueriesAndMutations = [
          'Categories',
          'MeCustomer',
          'ShowCart',
          'Addresses',
          'CreateAddress',
          'AddToCart',
          'UpdateCartQuantity',
          'DeleteCartProduct',
        ]
        // Check if the operation is one of the protected queries/mutations
        if (protectedQueriesAndMutations.includes(operationName) && !contextValue.customer) {
          throw new GraphQLError('Authentication required', {
            extensions: {
              code: 'UNAUTHENTICATED',
            },
          })
        }
      },
    }
  },
}
