import mongoose from "mongoose";
const candidateSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    party:{type:String,required:true,trim:true},
    age:{type:Number,required:true,trim:true},
    candidateImage:{type:String,trim:true},
    votes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user',
                required:true
            },
            votedAt:{
                type:Date,
                default:Date.now() 
            }

        }
    ],
    voteCount:{
        type:Number,
        default:0
    }
});
const candidateModel = mongoose.model("candidate",candidateSchema)
export default candidateModel