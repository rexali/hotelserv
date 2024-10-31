import { User } from ".././profiles/models/user.model";


function createUser(req:any,res:any) {
    const userObject = {
        username:"Ali",
        password:"12345",
        role:"Admin", 
        permission:"permission",
        status:"no",
        code:"qwerty"
    }
    return User.create(userObject).then((data:any)=>{
           console.log(data)
    })
}

export{
    createUser
}