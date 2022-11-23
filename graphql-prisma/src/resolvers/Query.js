import getUserId from "../utils/getUserId"

const  Query= {
    me:async (parent, args, {req,prisma}, info) => {
        
        const userId=getUserId(req)

        return prisma.query.user({
            where:{
                id:userId
            }
        })


    },
    post: async (parent, args, {req,prisma}, info) => {

        const userId=getUserId(req,false)
        const posts=await prisma.query.posts({
            where:{
                id:args.id,
                OR:[{
                    author:{
                        id:userId
                    }
                }]
            }
        },info)

        if(posts.length===0){
            throw new Error("Posts not found")
        }

        return post[0]
   
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
    allUser: (parent, args, {db,prisma}, info) => {
       
        const opArgs={
            first:args.first,
            skip:args.skip,
            after:args.after,
            orderBy:args.orderBy
        }

        if(args.query){
            opArgs.where={
                OR:[{
                    name_contains:args.query
                }
            ]
            }
        }

       return prisma.query.users(opArgs,info)


        

    },
    allPost: (parent, args, {prisma}, info) => {
       
   

        const opArgs={
            where:{
                published:true
            },
            first:args.first,
            skip:args.skip,
            after:args.after,
            orderBy:args.orderBy
        }

        if(args.query){
            opArgs.where.OR=[{
                title_contains:args.query
            },{
                body_contains:args.query
            }
        ]
        }


        return prisma.query.posts(opArgs,info)

        

    },
    comments:(parent, args, {prisma}, info)=>{

        const opArgs={
          
            first:args.first,
            skip:args.skip,
            after:args.after,
            orderBy:args.orderBy
        }
            return prisma.query.comments(opArgs,info)
        // return ctx.db.comments
    },
    myPost:(parent, args, {prisma,req}, info)=>{

        const userId=getUserId(req)

        const opArg={
            where:{
                author:{
                    id:userId
                }
            },
            first:args.first,
            skip:args.skip,
            after:args.after
        }

        if(args.query){
            opArg.where.OR=[{
                title_contains:args.query
            },{
                body_contains:args.query
            }]
        }

        return prisma.query.posts(opArg,info)

    }   



}

export default Query