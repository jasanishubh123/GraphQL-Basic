import { makeExecutableSchema } from '@graphql-tools/schema'
import { Context } from './context'

const typeDefs = `
type Mutation {
  signupUser(data: UserCreateInput!): User!
}
type Query {
  allUsers: [User!]!
}
type User {
  email: String!
  id: String!
  name: String
}
input UserCreateInput {
  email: String!
  name: String
}
`

const resolvers = {
  Query: {
    allUsers: async(_parent: any, _args: any, context: Context) => {
      // await context.prisma.$connect();
      return await context.prisma.user.findMany()
    }
  },
  Mutation: {
    signupUser:(_parent: any, args: { data: UserCreateInput }, context: Context) => {
        try {
            // context.prisma.$connect();
            let data = context.prisma.user.create({
                data: {
                name: args.data.name,
                email: args.data.email,
                },
            })
            // data.then((d)=>{
            //   console.log(d);  
            // })
            return data;

        } catch (error) {
            console.log(error)
        }
    }
  }
}

interface UserCreateInput {
  email: string,
  name?: string,
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})


// generator client {
//   provider        = "prisma-client-js"
//   previewFeatures = ["mongoDb"]
// }


// datasource db {
//   provider = "mongodb"
//   url      = "mongodb://127.0.0.1:27017/testdb"
// }

// model User {
//     id  String  @id @default(dbgenerated()) @map("_id") @db.ObjectId
//   email String  @unique
//   name  String?
// }