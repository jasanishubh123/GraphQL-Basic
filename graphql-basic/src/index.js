import {GraphQLServer} from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import User from './resolvers/User'
import Mutation from './resolvers/Mutation'


const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers:{
        Query,
        Post,
        Comment,
        User,
        Mutation
    },
    context:{
        db:db
    }
})

server.start(() => {
    console.log("Server Start")
})

