import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import connectDb from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import genaiRoutes from './routes/genaiRoutes.js'
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';



// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express()
const port = process.env.port
const DATABASE_URL = process.env.DATABASE_URL
//cors policy
app.use(cors())

//db connection
connectDb(DATABASE_URL)




//json(for api)
app.use(express.json())


//load routes
app.use("/api/user",userRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/genai",genaiRoutes)


// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.listen(port,()=>{
console.log(`server listening at http://localhost:${port}`)
})


//  "email":"admin@gmail.com",
//  "password":"votify@123"



//email:1pratham1sharma@gmail.com,
//password:123456