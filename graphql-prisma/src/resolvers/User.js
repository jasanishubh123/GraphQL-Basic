const User={
    posts:(parent, args, ctx, info)=>{
        console.log(parent)
        return ctx.db.posts.filter((post)=>{
            return post.author===parent.id 
        })  
    },
    comments:(parent, args, ctx, info)=>{
        return ctx.db.comments.filter((coms)=>{
            return coms.user===parent.id
        })
    }
}

export default User