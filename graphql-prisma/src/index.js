import {GraphQLServer , PubSub} from 'graphql-yoga'
import db from './db'
import {resolvers ,fragmentReplacement } from './resolvers/index'
import  prisma from './prisma'

const pubsub= new PubSub()

const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers:resolvers,
    context(req){
        
        return {
            db:db,
            pubsub,
            prisma,
            req
        }
    },
    fragmentReplacement
})

server.start(() => {
    console.log("Server Start")
})

