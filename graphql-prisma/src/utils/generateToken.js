import jwt from 'jsonwebtoken'

const generateToken=(userId)=>{
    return jwt.sign({userId:userId},"secretofmine",{expiresIn:'7 days'})
}

export default generateToken