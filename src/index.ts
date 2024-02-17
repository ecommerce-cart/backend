import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import { json } from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import { typeDefs } from './graphql/gql-types'
import { resolvers } from './graphql/resolvers'
import { formatError } from './middlewares/format-error'
import { MyContext, context } from './graphql/context/context'
import { authPlugin } from './graphql/plugins/auth.plugin'

dotenv.config()
const expressApp = express()
const httpServer = http.createServer(expressApp)

const port = Number(process.env.PORT) || 6002

const app = async () => {
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    formatError,
    plugins: [authPlugin, ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true,
  })

  await server.start()

  // Configure CORS middleware with the desired options
  const corsOptions: cors.CorsOptions = {
    origin: ['http://localhost:3000'], // Replace with the actual origins you want to allow
    credentials: true,
  }

  expressApp.use(cors(corsOptions))
  expressApp.use(json())
  expressApp.use(cookieParser())
  expressApp.use(
    '/graphql',
    expressMiddleware(server, {
      context,
    }),
  )

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
}

app()
