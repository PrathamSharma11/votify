import React, { useState } from 'react';
import Home from "./Component/Home";
import Header from "./Component/layouts/Header";
import Footer from "./Component/layouts/Footer";
import About from "./Component/About";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Profile from "./Component/Profile";
import LiveCounting from "./Component/LiveCounting";
import AdminLogin from './Component/AdminLogin';
import ChangePassword from './Component/ChangePassword';
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from './Component/AdminDashboard';
// import RefreshHandler from './RefreshHandler';
function App() {
//    const [isAuthenticated,setIsAuthenticated] = useState(false);

//    const PrivateRoute = ({element})=>{
//        return isAuthenticated ? element : <Navigate to="/login"/>
//    }

return (

<>  
{/* <RefreshHandler setIsAuthenticated={setIsAuthenticated}/> */}
   
<ToastContainer />
    <Header/>
    <Routes>
    <Route path="/home"  element={<Home/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/about" element={<About/>} />
    <Route path="/profile" element={<Profile/>} />
    <Route path="/livecounting" element={<LiveCounting/>} />
    <Route path='/adminlogin' element={<AdminLogin/>}/>
    <Route path='/admindashboard' element={<AdminDashboard/>}/>
    <Route path='/changePassword' element={<ChangePassword/>}/>
    </Routes>
    <Footer/>
    

</>
);
}

export default App;
