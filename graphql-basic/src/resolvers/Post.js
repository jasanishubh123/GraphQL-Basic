const Post={
    author:(parent, args, ctx, info)=>{
       return  ctx.db.users.find((user)=>{
            return user.id===parent.author
       })
    },
    comments:(parent, args, ctx, info)=>{
        return ctx.db.comments.filter((com)=>{
            return com.post===parent.id
        })
    }

}
export default Post