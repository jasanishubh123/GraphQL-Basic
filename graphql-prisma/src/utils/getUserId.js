import jwt from 'jsonwebtoken'

const getUserId=(req,requireAuth=true)=>{
    const header=req.request?
    req.request.headers.authorization:
    req.connection.context.Authorization

    if(header){
        const token=header.replace('Bearer ','')
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        return decode.userId
    }

    if(requireAuth){
        throw new Error("Authenticated must be required")
    }

   return null
}

export default getUserId