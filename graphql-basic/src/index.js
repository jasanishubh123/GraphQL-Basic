import { GraphQLServer } from 'graphql-yoga'


const users=[
    {
        id: '123423',
        name: 'Jay',
        email: "jay@gmail.com",
        age: 23
    },
    {
        id: '22121',
        name: 'Shivam',
        email: "shivam@gmail.com",
        age: 22
    }

]

const posts=[
    {
        id: "01",
        title: "My GraphQL third",
        body: "Second Post",
        published: false,
        author:"123423"
    },
    {
        id: "02",
        title: "My Nodejs",
        body: "third Post",
        published: false,
        author:"22121"
    },
    {
        id: "03",
        title: "My JS",
        body: "fourth Post",
        published: false,
        author:"22121"
    }

]

const comments=[
    {
        id:"001",
        text:"Nice Picssss 1",
        user:"123423",
        post:"01"

    },

    {
        id:"002",
        text:"Nice Picssss 2" ,
        user:"123423",
        post:"02"

    },

    {
        id:"003",
        text:"Nice Picssss 3",
        user:"22121",
        post:"02"

    },

    {
        id:"004",
        text:"Nice Picssss 4",
        user:"22121",
        post:"03"



    }
]


//Scalar Type - String , Booloean , Int ,Float, ID (unique Identifier)


// type definition (Schema)
const typeDefs = `
        type Query {
            greeting(name: String , position:String):String!
            me: User!
            post :Post!
            sum(a:Float!,b:Float!):Float!
            grades:[String!]!
            allPost(query:String):[Post!]!
            allUser(query:String):[User!]!
            comments:[Comment!]!
        }
        type User {  
            id:ID!
            name:String!
            email:String!
            age:Int
            posts:[Post!]!
            comments:[Comment!]!

        }

        type Post {
            id:ID!
            title:String!
            body:String!
            published:Boolean!
            author:User!
            comments:[Comment!]!

        }

        type Comment {
            id:ID!
            text:String!
            user:User!
            post:Post!
        }
    `



// Resolver

const resolvers = {
    Query: {
        me: () => {
            return {
                id: '123423',
                name: 'Jay',
                email: "jay@gmail.com",
                age: 23

            }
        },
        post: () => {
            return {
                id: "1221",
                title: "My Post",
                body: "First Post",
                published: false,
                author:"123423"
            }
        },
        greeting: (parent, args, ctx, info) => {
            if (args.name && args.position)
                return "Hello " + args.name + " " + args.position
            else return "Hello"
        },
        sum: (parent, args, ctx, info) => {
            if (args.a && args.b) {
                return args.a + args.b
            } else {
                return 0
            }
        },
        grades: (parent, args, ctx, info) => {
            return ["Shubham", "Jasani", "Okay"]
        },
        allUser: (parent, args, ctx, info) => {
           
            if(args.query){
               return users.filter((user)=>{
                   return  user.name.toLowerCase().includes(args.query.toLowerCase())
                })
            }else
            return users

            

        },
        allPost: (parent, args, ctx, info) => {
           

            if(args.query){
               return posts.filter((post)=>{
                   return  post.title.toLowerCase().includes(args.query.toLowerCase()) ||
                   post.body.toLowerCase().includes(args.query.toLowerCase())
                })
            }else
            return posts

            

        },
        comments:()=>{
            return comments
        }



    },
    Post:{
        author:(parent, args, ctx, info)=>{
           return  users.find((user)=>{
                return user.id===parent.author
           })
        },
        comments:(parent, args, ctx, info)=>{
            return comments.filter((com)=>{
                return com.post===parent.id
            })
        }

    },
    User:{
        posts:(parent, args, ctx, info)=>{
            console.log(parent)
            return posts.filter((post)=>{
                return post.author===parent.id 
            })  
        },
        comments:(parent, args, ctx, info)=>{
            return comments.filter((coms)=>{
                return coms.user===parent.id
            })
        }
    },
    Comment:{
        user:(parent, args, ctx, info)=>{
            return users.find((user)=>{
                return user.id===parent.user 
            }) 
        },
        post:(parent, args, ctx, info)=>{
            return posts.find((post)=>{
                return post.id===parent.post
            })
        }
    }

}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(() => {
    console.log("Server Start")
})

