import { Prisma } from 'prisma-binding'

console.log("hello")
const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query.users(null,'{id name email posts{id title}}').then((data)=>{
//     console.log(JSON.stringify(data,undefined,2))
// }) 

// prisma.query.comments(null,'{id text user {id name} }').then((data)=>{
//     console.log(JSON.stringify(data,undefined,2))
// }).catch((err)=>{
//     console.log(err)
// })

// prisma.mutation.createPost({
//     data: {
//         title: "New Post",
//         body: "New Body",
//         published: true,
//         author: {
//             connect:{
//                 id: "ckdqdtma3001h0905c75aah68",
//                 email: "jasanishubh@gmail.com"
//             }
           
//         }
//     }
// },'{id title body published}').then((data)=>{
//     console.log(JSON.stringify(data))
// })



//async Function

// const createPostForUser= async(authorId,data)=>{

//     const userExist=prisma.exists.User({
//         id:authorId
//     })

//     console.log(userExist)
//     if(!userExist){
//         throw new Error("User not found baka")
//     }

//     const post=await prisma.mutation.createPost({
//        data:{
//            ...data,
//            author:{
//                connect:{
//                      id:authorId
//                }
//            }
//        } 
//     },`{id}`)

//     const user=await prisma.query.user({
//         where:{
//             id:authorId

//         }
//     },'{id name email posts{id title published}}')

//     return user

// }

// createPostForUser("wewe",{
//     title:"Haso hasavo",
//     body:"TMKOC",
//     published:true
// }).then((data)=>{
//         console.log(JSON.stringify(data,undefined,2))
// }).catch((err)=>{console.log(err.message)})


//exist or not

// prisma.exists.User({
//     id:"ckdqdtma3001h0905c75aah68"
// }).then((exists)=>{
//     console.log(exists)
// })