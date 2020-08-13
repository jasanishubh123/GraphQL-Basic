import Query from './Query'
import Post from './Post'
import Comment from './Comment'
import User from './User'
import Mutation from './Mutation'
import Subscription from './Subscription'
import { extractFragmentReplacements } from 'prisma-binding'
 
const resolvers = {

    Query,
    Post,
    Subscription,
    Comment,
    User,
    Mutation

}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export { resolvers,fragmentReplacements}