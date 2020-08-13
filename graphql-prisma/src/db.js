let users=[
    {
        id: '123423',
        name: 'Jay',
        email: "jay@gmail.com",
        
    },
    {
        id: '22121',
        name: 'Shivam',
        email: "shivam@gmail.com",
        
    }

]

let posts=[
    {
        id: "01",
        title: "My GraphQL third",
        body: "Second Post",
        published: false,
        author:"123423"
    },
    {
        id: "02",
        title: "My Nodejs",
        body: "third Post",
        published: false,
        author:"22121"
    },
    {
        id: "03",
        title: "My JS",
        body: "fourth Post",
        published: false,
        author:"22121"
    }

]

let comments=[
    {
        id:"001",
        text:"Nice Picssss 1",
        user:"123423",
        post:"01"

    },

    {
        id:"002",
        text:"Nice Picssss 2" ,
        user:"123423",
        post:"02"

    },

    {
        id:"003",
        text:"Nice Picssss 3",
        user:"22121",
        post:"02"

    },

    {
        id:"004",
        text:"Nice Picssss 4",
        user:"22121",
        post:"03"



    }
]

const db={
    users,
    posts,
    comments
}

export default db