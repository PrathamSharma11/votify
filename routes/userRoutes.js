import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import checkUserAuth from '../middleware/auth-middleware.js'
import multerUpload from '../config/multerConfig.js'; 


//middleware routes
router.use('/changeuserpassword',checkUserAuth)
router.use('/get-user-data',checkUserAuth)
router.use('/upload-single',checkUserAuth)
router.use('/getCandidates',checkUserAuth)
router.use('/voting/:candidatesId',checkUserAuth)
router.use('/voteCounting',checkUserAuth)

//public routes
router.post('/register',UserController.userRegistration)
router.post('/user-login',UserController.userLogin)
router.post('/forgot-password',UserController.forgotPassword)//isse email par redirect hoga
router.post('/inEmail-Forgot-password/:id/:token',UserController.userPasswordForgot)//isse email k andar password and confirm password hoga



//protected routes
router.post('/changeuserpassword',UserController.changeUserPassword)//login k baad password change karna
router.get('/get-user-data',UserController.userData)
// Route for single file upload
router.post('/upload-single', multerUpload.single('profile-file'), UserController.uploadSingleFile);
router.get('/get-candidates',UserController.getCandidates)
router.post('/voting/:candidateId',UserController.voting)
router.get('/voteCounting',UserController.voteCounting)



export default router 