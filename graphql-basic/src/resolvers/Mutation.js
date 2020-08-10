import {v4 as uuid} from 'uuid'

const Mutation={
    createUser:(parent, args, ctx, info)=>{
        const emailTaken = ctx.db.users.some((user)=>{
            return user.email ===args.data.email
        })
        if(emailTaken){
            throw  new Error('Email Taken')
        }

        

        const user={
            id:uuid(),
           
            ...args.data
        }
        
        ctx.db.users.push(user)
        return user
    },
    createPost:(parent, args, ctx, info)=>{


        const UserExist=ctx.db.users.some((user)=>{
            return user.id===args.data.author
        })

        console.log("User Exist "+UserExist)
        if(!UserExist){
            throw  new Error('User not Exist')

        }

        console.log("Create POST")
            const post={
                id:uuid(),
               ...args.data
            }
            ctx.db.posts.push(post)
            return post
        

    },
    createComment:(parent, args, ctx, info)=>{

        const UserExist=ctx.db.users.some((user)=>{
            return user.id===args.data.user
        })
        const PostExist=ctx.db.posts.some((post)=>{
           return post.id===args.data.post
        })

        console.log("User "+UserExist +" "+" Post Exist "+PostExist)

        if(!UserExist || !PostExist){
            throw new Error("User Or Post not Exist")
          
        }
        
        const comment={
            id:uuid(),
           ...args.data
        }

        ctx.db.comments.push(comment)

        return comment

    },
    deleteUser:(parent, args, ctx, info)=>{
        const userIndex= ctx.db.users.findIndex((user)=>{
            return user.id===args.id
        })
        
        if(userIndex===-1){
             throw new Error("User not found")
        }

       const deletedUser = ctx.db.users.splice(userIndex,1);

       ctx.db.posts=ctx.db.posts.filter((post)=>{
            const match=post.author===args.id

            if(match){
                ctx.db.comments=ctx.db.comments.filter((comment)=>{
                    return comment.post !==post.id
                })
            }

            return !match

       })

       ctx.db.comments=ctx.db.comments.filter((comment)=> comment.user !==args.id)

       return deletedUser[0]

    },
    deletePost:(parent, args, ctx, info)=>{
        const PostIndex=ctx.db.posts.findIndex((post)=>{
            return post.id===args.id
        })
        if(PostIndex===-1){
            throw new Error("Post not found")
        }

        const deletedPost=ctx.db.posts.splice(PostIndex,1);

        ctx.db.comments=ctx.db.comments.filter((com)=>{
            return com.post !== args.id
        })

        return deletedPost[0]


    },
    deleteComment:(parent, args, ctx, info)=>{

        const commentIndex=ctx.db.comments.findIndex((com)=>{
            return com.id===args.id
        })

        if(commentIndex===-1){
            throw new Error("Comments Not Found")
        }

        const deletedComment=ctx.db.comments.splice(commentIndex,1)

        return deletedComment[0]

    },
    updateUser:(parent, args, {db}, info)=>{

        const {id,data}=args

        const user=db.users.find((user)=>{
            return user.id===id
        })

        if(!user){
            throw new Error("User not found")
        }

        if(typeof data.email === 'string'){
            const emailTaken=db.users.some((user)=>{
                if(user.id!==id){
                    return user.email===data.email
                }
                
            })

            if(emailTaken){
                throw new Error("Email Already Exist")
            }
            user.email=data.email
        }

        if(typeof data.name==='string')
        {
            user.name=data.name
        }

        if(typeof data.age !== 'undefined'){
            user.age=data.age
        }

        return user


    },
    updatePost:(parent, args, {db}, info)=>{
        const {id,data}=args

        const post = db.posts.find((post)=>{
                return post.id===id
        })

        if(!post){
            throw new Error("Post Not Found")
        }

        if(typeof data.title==='string'){
            post.title=data.title
        }
        if(typeof data.body==='string'){
            post.body=data.body
        }
        if(typeof data.published==='boolean'){
            post.published=data.published
        }

        return post

    },
    updateComment:(parent, args, {db}, info)=>{
        const {id,text}=args
        const comment=db.comments.find((com)=>{
            return com.id===id
        })
        if(!comment){
            throw new Error("Comment not found")
        }
        if(typeof text==='string'){

            comment.text=text

        }

        return comment


    }

}
export default Mutation