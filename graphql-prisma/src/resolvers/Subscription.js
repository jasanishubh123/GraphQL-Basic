
import getUserId from '../utils/getUserId'
const Subscription={
        count:{
            subscribe:(parent,args,{pubsub},info)=>{
                let count=0
                setInterval(()=>{
                    count++
                    pubsub.publish('count',{
                        count:count
                    })
                },1000)
                return pubsub.asyncIterator('count')
            }
        },
        comment:{
            subscribe:(parent,{postId},{prisma},info)=>{
               
                
                return prisma.Subscription.comment(null,info)
            }
        },
        post:{
            subscribe:(parent,args,{prisma},info)=>{

              
                return prisma.Subscription.post({
                    where:{
                       node:{
                           published:true
                       } 
                    }
                },info)

            }
        },
        myPost:{
            subscribe:(parent,args,{req,prisma},info)=>{
                const userId=getUserId(req)

                return prisma.Subscription.post({
                    where:{
                        node:{
                            author:{
                                id:id
                            }
                        }
                    }
                })
            }
        }
}
 export default Subscription