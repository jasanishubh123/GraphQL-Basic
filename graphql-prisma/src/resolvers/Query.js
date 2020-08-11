const  Query= {
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
           return ctx.db.users.filter((user)=>{
               return  user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        }else
        return ctx.db.users

        

    },
    allPost: (parent, args, ctx, info) => {
       
        console.log(ctx)

        if(args.query){
           return ctx.db.posts.filter((post)=>{
               return  post.title.toLowerCase().includes(args.query.toLowerCase()) ||
               post.body.toLowerCase().includes(args.query.toLowerCase())
            })
        }else
        return ctx.db.posts

        

    },
    comments:(parent, args, ctx, info)=>{
        return ctx.db.comments
    }



}

export default Query