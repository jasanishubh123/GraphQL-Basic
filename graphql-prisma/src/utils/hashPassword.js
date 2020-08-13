import bcrypt from 'bcryptjs'

const hashPassword=(password)=>{
    if(password.length<8){
        throw new Error("Password must be 8 char or more")
    }

   const pass= bcrypt.hash(password,10)

   return pass

}

export default hashPassword
