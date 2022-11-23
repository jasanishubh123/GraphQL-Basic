import ApolloBoost,{gql} from 'apollo-boost'

const client=new ApolloBoost({
    uri:'http://localhost:4000'
})

const getUser=gql`
    query{
        allUser{
            id
            name
        }
    }
`

client.query({
    query:getUser
}).then((res)=>{
    const html=''
    
    console.log(res.data)
}).catch(()=>{
    console.log()
})