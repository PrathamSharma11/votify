import candidateModel from "../models/Candidate.js";
import userModel from "../models/User.js";
import jwt from "jsonwebtoken";
import transporter from "../config/emailConfig.js";
import fs from 'fs';
import path from 'path';




class AdminController{
    static adminLogin = async (req,res)=>{
        try {
            const {email,password} = req.body
            if(email && password){
                const user = await userModel.findOne({email:email})
            if(user !=null && password == user.password){
              //jwt token
            const token = jwt.sign({ userId: user._id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '5d' });

            res.send({"status":"success","message":"Login Success","token":token})
            }
            else{
                res.send({"status":"failed","message":"email is not registered or password doesnt matched"})

            }

            }else{
                res.send({"status":"failed","message":"all fields are required"})
            }
            
        } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":"unable to login"})
        }
    }
    static adminData = async(req,res)=>{
        res.send({"user":req.user})
    }
    static createCandidate = async(req,res)=>{
        const {name,party,age} = req.body;
        const candidateImage = req.file;
        if(!name || !party || !age || !candidateImage){
            return res.status(400).json({ message: 'All fields are required, including candidateImage.' });

        } 
        try{
            const imageFilename = candidateImage.filename;
            const newCandidate = new candidateModel({
                name,
                party,
                age,
                candidateImage: imageFilename,
              });
        
    const savedCandidate = await newCandidate.save();

   
    res.status(201).json({
      message: 'Candidate created successfully!',
      candidate: savedCandidate,
    });

        }catch(error){
            res.status(500).json({ message: 'Server error', error: error.message });

        }
    }
    static candidateData = async(req,res)=>{
        try {
           
            const candidates = await candidateModel.find();
        
            
            if (!candidates || candidates.length === 0) {
              return res.status(404).json({ message: 'No candidates found' });
            }

            // Modify the candidates to include the full image path
    const modifiedCandidates = candidates.map(candidate => ({
        ...candidate.toObject(),
        candidateImageUrl: `uploads/admin/candidate/${candidate.candidateImage}`,
      }));
        
            
            res.status(200).json({
              message: 'Candidates fetched successfully',
              candidates: modifiedCandidates,
            });
          } catch (error) {
           
            res.status(500).json({
              message: 'Server error',
              error: error.message,
            });
          }
    }
    static deleteCandidate = async(req,res)=>{
         try{
            const {id} = req.params;
            const candidate = await candidateModel.findById(id);
            if(!candidate){
                return res.status(404).json({message: 'Candidate not found' });
            }
            const data = await candidateModel.findByIdAndDelete(id);
    res.status(200).json({
        message: 'Candidate deleted successfully',
      });

         }catch(error){
            res.status(500).json({
                message: 'Server error',
                error: error.message,
              });
         }
    
        }

    static  updateCandidate = async (req, res) => {
        try {
          const { id } = req.params;
          const { name, party, age } = req.body;
          const candidateImage = req.file;
      
          // Find the candidate by ID
          const candidate = await candidateModel.findById(id);
      
          if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
          }
      
          // Update the fields if provided
          candidate.name = name || candidate.name;
          candidate.party = party || candidate.party;
          candidate.age = age || candidate.age;
      
          // If a new image is provided, delete the old image and update with the new one
          if (candidateImage) {
            const oldImagePath = path.join('uploads', candidate.candidateImage);
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath); // Remove the old image file
            }
      
            candidate.candidateImage = candidateImage.filename;

          }
      
          // Save the updated candidate
          const updatedCandidate = await candidate.save();
      
          // Send the updated candidate data with full image path in response
          res.status(200).json({
            message: 'Candidate updated successfully!',
            candidate: {
              ...updatedCandidate._doc, // Spread other candidate fields
              candidateImage: `uploads/admin/candidate/${updatedCandidate.candidateImage}`, // Full image path
            },
          });
        } catch (error) {
          res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
    
}
export default AdminController
