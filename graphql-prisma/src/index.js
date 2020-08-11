import {GraphQLServer , PubSub} from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import User from './resolvers/User'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import './prisma'

const pubsub= new PubSub()

const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers:{
        Query,
        Post,
        Subscription,
        Comment,
        User,
        Mutation
    },
    context:{
        db:db,
        pubsub
    }
})

server.start(() => {
    console.log("Server Start")
})

