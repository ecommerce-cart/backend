/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServerErrorCode } from '@apollo/server/errors'
import { GraphQLFormattedError } from 'graphql'
import { ValidationError } from 'yup'

export const formatError = (formattedError: GraphQLFormattedError, error: any): GraphQLFormattedError => {
  console.log(error)

  // Return a different error message
  if (formattedError.extensions.code === ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED) {
    return {
      ...formattedError,
      message: "Your query doesn't match the schema. Try double-checking it!",
    }
  }

  if (error.originalError instanceof ValidationError) {
    const validationErrors = {}

    error.originalError.inner.forEach((err) => {
      // Get the field name from the error path
      const fieldName = err.path

      // Add the error message to the corresponding field in the object
      if (!validationErrors[fieldName]) {
        validationErrors[fieldName] = []
      }
      validationErrors[fieldName].push(err.message)
    })
    return {
      ...formattedError,
      message: 'Invalid input provided!',
      extensions: {
        code: 'VALIDATION_ERROR',
        errors: validationErrors,
      },
    }
  }
  // Otherwise return the formatted error. This error can also
  // be manipulated in other ways, as long as it's returned.
  return formattedError
}
