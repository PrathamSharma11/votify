import userModel from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import transporter from "../config/emailConfig.js";
import candidateModel from "../models/Candidate.js";

class UserController{
    static userRegistration = async (req,res)=>{ 
      const {name,email,password,password_confirmation,tc} = req.body
      const user = await userModel.findOne({email:email})
      if(user){
        res.send({'status':'failed',"message":"email already exists"})
      }
      else{
        if(name && email && password && password_confirmation && tc){
            if(password === password_confirmation){
                try{
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password,salt)
                    const doc = new userModel({
                        name:name,
                        email:email,
                        password:hashPassword,
                        tc:tc
                    })
                    await doc.save()
                    const saved_user = await userModel.findOne({email:email})

                    //generate JWT
                    const token = jwt.sign({ userId: saved_user._id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '5d' });
                    res.status(201).send({"status":"success","message":"registration successfull","token":token})

                }catch(error){
                  console.log(error)
                  res.send({"status":"failed","message":"unable to register"})
                }

            }else{
                res.send({"status":"failed","message":"password and confirmation password doesnot match"})
            }

        }else{
          res.send({"status":"failed","message":"all fields are required"})
        }
      }
    }
    static userLogin = async(req,res)=>{
      try{
        const {email,password} = req.body
        if(email && password){
          const user = await userModel.findOne({email:email})
          if(user !=null){
           const isMatch = await bcrypt.compare(password,user.password)
           if(user.email === email && isMatch){
            //jwt token
            const token = jwt.sign({ userId: user._id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '5d' });

            res.send({"status":"success","message":"Login Success","token":token})
           }else{
            res.send({"status":"failed","message":"email or password is invalid"})
           }
          }else{
            res.send({"status":"failed","message":"email is not registered"})
          }

        }else{
          res.send({"status":"failed","message":"all fields are required"})
        }
      }catch(error){
        console.log(error)
        res.send({"status":"failed","message":"unable to login"})
      }
    }
   
    static changeUserPassword = async(req,res)=>{
      const {password,password_confirmation} = req.body
     if(password !== password_confirmation){
       res.send({"status":"failed","message":"new password and confirm password doesn't match"})
     }else{
       const salt = await bcrypt.genSalt(10)
       const newHashPassword = await bcrypt.hash(password,salt)
      //  console.log(req.user);
      await userModel.findByIdAndUpdate(req.user._id,{$set:{
        password:newHashPassword
      }})
       res.send({"status":"success","message":"password changed successfully"})
     }
    }

    static userData = async(req,res)=>{
      res.send({"user":req.user})
    }

    static forgotPassword = async(req,res)=>{
       const {email} = req.body
       if(email){
         const user = await userModel.findOne({email:email})
         
         if(user){
          const secret = user._id + process.env.JWT_SECRET_KEY
         const token = jwt.sign({userId:user._id},secret,{
          expiresIn:'15m'
         })
         const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
        console.log(link) 

        //send Email
        let info = await transporter.sendMail({
          from:process.env.MAIL_FROM,
          to:user.email,
          subject:"password rest link",
          html:`<a href=${link}=click here</a> to reset your password`
        })
         res.send({"status":"success","message":"password rest email send.....please check your email","info":info})
         }else{
          res.send({"status":"failed","message":"email doesnt exist"})
         }
       }
       else{
        res.send({"status":"failed","message":"email is required"})
       }
     }

    static userPasswordForgot = async(req,res)=>{
      const {password,password_confirmation} = req.body
      const {id,token} = req.params //params mein url wala data aata h
      const user = await userModel.findById(id)
      const new_secret = user._id + process.env.JWT_SECRET_KEY
      try {
        jwt.verify(token,new_secret)
        if(password && password_confirmation){
            if(password !== password_confirmation){
              res.send({"status":"failed","message":"password and password_confirmation doesnt matched"})

            }else{
              const salt = await bcrypt.genSalt(10)
              const newHashPassword = await bcrypt.hash(password,salt)
              await userModel.findByIdAndUpdate(user._id,{$set:{
                password:newHashPassword
              }})
              res.send({"status":"success","message":"password changes successfully"})

            }
        }else{
          res.send({"status":"failed","message":"password and password_confirmation both are required"})

        }
      } catch (error) {
        console.log(error)
        res.send({"status":"failed","message":"invalid token"})
      }
    }

   
static uploadSingleFile = async (req, res) => {
  try {
    // Get the logged-in user's ID from the middleware (req.user should be populated)
    const userId = req.user._id;

    // Check if file is provided in the request
    if (!req.file) {
      return res.status(400).send({ status: "failed", message: "No file uploaded" });
    }

    // Store only the filename in the database
    const filename = req.file.filename;

    // Update the user in the database with the filename
    const updatedUser = await userModel.findByIdAndUpdate(userId, {
      image: filename
    }, { new: true });  // { new: true } ensures the updated user object is returned

    // If user update was successful
    if (updatedUser) {
      // Construct the relative path for the image (for the response)
      const relativeFilePath = `uploads/${filename}`;

      return res.status(200).send({
        success: true,
        message: "Profile image updated successfully",
        user: {
          ...updatedUser._doc,  // Spread to include all other user fields
          image: relativeFilePath  // Relative path for response
        }
      });
    } else {
      return res.status(404).send({ status: "failed", message: "User not found" });
    }

  } catch (error) {
    console.error("Error in uploading file:", error);
    return res.status(500).send({ status: "failed", message: "Internal server error" });
  }
};
static getCandidates = async (req, res) => {
  try {
    const candidates = await candidateModel.find();
    res.status(200).json({
      message: 'Candidates fetched successfully!',
      candidates, 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
static voting = async (req,res) => {
  const candidateId = req.params.candidateId;//parameter se candidate ki id nikaal li
  const userId = req.user.id; //token se id nikaal li user ki
  // console.log(userId);
  try{
    const candidate = await candidateModel.findById(candidateId);
    // console.log(candidate);
    if(!candidate){
      return res.status(200).json({message:"candidate not found"});
    }
    const user = await userModel.findById(userId);
    if(!user){
      return res.status(200).json({message:"user not found"});
    }
    if(user.isVoted){
      return res.status(200).json({message:"user has already voted"});
    }
    if(userId === "67616072710beb6d1d661501"){
      return res.status(200).json({message:"admin cannot vote"});
    }
    candidate.votes.push({user:userId})
    candidate.voteCount++;
    await candidate.save();

    //update the user model
    user.isVoted = true 
    await user.save();
    res.status(200).json({message:'vote recorded successfully'});

  }catch(error){
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}
static voteCounting = async(req,res)=>{
  try{
    const candidate = await candidateModel.find().sort({voteCount:"desc"});
    const record = candidate.map((data)=>{
      return{
        party:data.party,
        count:data.voteCount,
        name:data.name,
        candidateImage:data.candidateImage,
      };
    });
    res.status(200).json(record);

  }catch(error){
    res.status(500).json({ message: 'Something went wrong', error: error.message });

  }
}

  
}
export default UserController
