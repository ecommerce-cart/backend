import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { typeDefs } from './graphql/gql-types'
import { resolvers } from './graphql/resolvers'
import { formatError } from './middlewares/format-error'

const port = Number(process.env.PORT) || 6002

const app = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: formatError,
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port },
  })

  console.log(`🚀 Server ready at ${url}`)
}

app()
