import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    password:{type:String,required:true,trim:true},
    tc:{type:Boolean,required:true},
    image:{type:String,trim:true},
    // role: { type: String, enum: ['user', 'admin'], default: 'user' } // Role field
    // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] // Reference to Post ,make a post model do a user field in that model and do populate in the controller
    isVoted:{
        type:Boolean,
        default:false
    }
})
const userModel = mongoose.model("user",userSchema)
export default userModel