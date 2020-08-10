const Comment={
    user:(parent, args, ctx, info)=>{
        return ctx.db.users.find((user)=>{
            return user.id===parent.user 
        }) 
    },
    post:(parent, args, ctx, info)=>{
        return ctx.db.posts.find((post)=>{
            return post.id===parent.post
        })
    }
}

export default Comment