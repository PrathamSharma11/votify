import express from "express";
import genaiController from "../controllers/genaiController.js";
const router = express.Router();
import checkUserAuth from '../middleware/auth-middleware.js';

//middleware routes
router.use('/generate',checkUserAuth)

router.post('/generate',genaiController.generate)







export default router 