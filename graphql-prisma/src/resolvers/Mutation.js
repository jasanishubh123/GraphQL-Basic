import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

// const token=jwt.sign({
//     id:46
// },'mysecret')
// console.log(token)

// // const decode=jwt.decode(token)

// // console.log(decode)

// const verify= jwt.verify("sassasaasasasasas",'mysecret')

// console.log(verify)

const Mutation = {

    Login:async(parent, args, { prisma }, info)=>{
        const user= await prisma.query.user({
            where:{
                email:args.data.email
            }
        })
        if(!user){
            throw new Error("User not found")
        }

        const isMatch = await bcrypt.compare(args.data.password,user.password)

        if(!isMatch){
            throw new Error("Unable to login")
        }

        return{
            user,
            token:generateToken(user.id)
        }


    },


    createUser: async (parent, args, { prisma }, info) => {

        const pass= await hashPassword(args.data.password)
        const user = await prisma.mutation.createUser({ 
            
            data: {
                ...args.data,
                password:pass
                
            }

        })

        return {
            user,
            token:generateToken(user.id)
        }
    },
    createPost:async (parent, args, { prisma ,req}, info) => {

        //get header value and validate token

        const userId=getUserId(req)

       
        return await prisma.mutation.createPost({
            data:{
                title:args.data.title,
                body:args.data.body,
                published:args.data.published,
                author:{
                    connect:{
                        id:userId
                    }
                }
            }
        },info)

    },
    createComment: async (parent, args, { req, prisma }, info) => {

        const userId=getUserId(req)

        const  postExist=await prisma.exists.Post({
            id:args.data.post,
            published:true
        })

        if(!postExist)
        {
            throw new Error("unable to create comment")
        }
        return await prisma.mutation.createComment({
            data:{
                text:args.data.text,
                author:{
                    connect:{
                        id:userId
                    }
                },
                post:{
                    connect:{
                        id:args.data.post
                    }
                }
            }
        },info)

    },
    deleteUser: async (parent, args, {prisma,req}, info) => {

        const userId=req.getUserId(req)
        return prisma.mutation.deleteUser({
            where:{
                id:userId
            }
        },info)




    },
    deletePost:async (parent, args, { prisma,req }, info) => {
       
        const userId=  getUserId(req)
        const postExist=await prisma.exists.Post({
            id:args.id,
            author:{
                id:userId
            }
        })

        if(!postExist){
            throw new Error('Unable to delete post')
        }

        return prisma.mutation.deletePost({
            where:{
                id:args.id
            }
        },info)

    },
    deleteComment: async (parent, args, { prisma,req }, info) => {

        const userId=getUserId(req)

        const CommentExist=await prisma.exists.Comment({
            id:args.id,
            author:{
                id:userId
            }  
        })

        if(!CommentExist){

            throw new Error("unable to delete Comments")
        }

        return prisma.mutation.deleteComment({
            where:{
                id:args.id
            }
        },info)
        
    },
    updateUser: async (parent, args, { prisma,req }, info) => {



        if(typeof args.data.password==='string'){
            args.data.password=await hashPassword(args.data.password)
        }
       
 
       

       return  prisma.mutation.updateUser({
             where:{
                 id:userId
             },

             data:args.data
         },info) 

   
    },
    updatePost: async (parent, args, { prisma ,req}, info) => {
       
        const userId=getUserId(req)
        
        const postExist=await prisma.exists.Post({
            id:args.id,
            author:{
                id:userId
            }
        })

        const isPublished= await prisma.exists.Post({
            id:args.id,published:true
        })

        if(!postExist){
            throw new Error("unable tp update the post")
        }

        if(isPublished && args.data.published===false){
            await prisma.mutation.deleteManyComments({
                where:{
                    post:{
                        id:args.id
                    }
                }
            })
        }

        return await prisma.mutation.updatePost({
            where:{
                id:args.id
            },
            data:args.data
        },info)

    },
    updateComment: async(parent, args, { db, req }, info) => {
        
        
        const userId=getUserId(req)

        const CommentExist=await prisma.exists.Comment({
            id:args.id,
            author:{
                id:userId
            }  
        })

        if(!CommentExist){

            throw new Error("unable to update Comments")
        }

        return await prisma.mutation.updateComment({
            where:{
                id:args.id
            },
            data:args.data
        },info)
    }

}
export default Mutation