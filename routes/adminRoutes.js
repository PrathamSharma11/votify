import express from "express";
import AdminController from "../controllers/adminController.js";
const router = express.Router();
import checkUserAuth from '../middleware/auth-middleware.js';
import multerUpload from '../config/multerConfig.js'; 
import multer from 'multer';
import path from 'path';



// Multer configuration for handling image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/admin/candidate'); // Folder where images will be stored
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Create a unique filename
    }
  });
  
  // Initialize multer middleware
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  });






//middleware routes
router.use('/get-admin-data',checkUserAuth)
router.use('/create-candidate',checkUserAuth)
router.use('/get-candidate',checkUserAuth)
router.use('/delete-candidate/:id',checkUserAuth)



router.post('/login',AdminController.adminLogin)



//protected routes
router.get('/get-admin-data',AdminController.adminData)
router.post('/create-candidate', upload.single('candidateImage'),AdminController.createCandidate)
router.get('/get-candidate',AdminController.candidateData)
router.delete('/delete-candidate/:id',AdminController.deleteCandidate)
router.put('/update-candidates/:id', upload.single('candidateImage'),AdminController.updateCandidate);


export default router 


