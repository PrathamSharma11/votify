import jwt from 'jsonwebtoken'
import userModel from '../models/User.js'


var checkUserAuth = async(req,res,next)=>{
let token
const {authorization} = req.headers
if(authorization && authorization.startsWith('Bearer')){
try{
//get token from header
token = authorization.split(' ')[1]
// console.log(token);

//verify token
const {userId} = jwt.verify(token,process.env.JWT_SECRET_KEY)
// console.log(userId)
//get user from token (logged in user ko nikal rhe h from token)
req.user = await userModel.findById(userId).select('-password')
// console.log(user);
next()
}catch(error){
console.log(error)
res.status(401).send({"status":"failed","message":"unauthorized user"})

}
}
if(!token){
res.send({"status":"failed","message":"no token"})
}
}

export default checkUserAuth