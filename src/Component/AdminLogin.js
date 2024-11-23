import React, { useState } from 'react'
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [admins,setadmins] = useState({
        email:'',
        password:'',
    })
    const handleChange = (e)=>{
        const {name,value} = e.target;
        const copyloginInfo = {...admins};
        copyloginInfo[name] = value;
        setadmins(copyloginInfo);
    };
    const navigate = useNavigate();
    const handleLogin = async(e)=>{
          e.preventDefault();
          const {email,password} = admins
          console.log({email,password});
          if(!email || !password){
            return handleError("all fields are required");
          }
          try {
            const url = "http://localhost:8000/api/admin/login";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(admins),

            });
            const data = await response.json();
            console.log(data);
            const {message,status,token} = data;
            if (status !== "success") {
                return handleError(message || "Login failed");
            }

            if(status === "success"){
                handleSuccess(message || "login successfull");
                localStorage.setItem('token',token);
                setTimeout(()=>{
                    navigate('/admindashboard');
                },1000);
            }
            console.log("Login successful:", data);
            
          } catch (error) {
            console.log('something went wrong',error);
          }
    }
  return (
   <>
   <div className='flex flex-col justify-center items-center text-center'>
    <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-md my-36'>
    <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
                    Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className='mb-4'>
        <label>Email</label><br/>
        <input type='text' placeholder='email' name='email'  onChange={handleChange}></input>  
      </div>
      <div className='mb-4'>
        <label>Password</label><br/>
        <input type='password' placeholder='password' name='password'onChange={handleChange} ></input>  
      </div>
      <button type='submit'  className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">Submit</button>
      </form>
    </div>

   </div>
   </>
  )
}

export default AdminLogin