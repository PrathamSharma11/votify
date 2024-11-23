import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError,handleSuccess } from '../utils';

function Login() {
         const [loginInfo,setloginInfo] = useState({
            email:'',
            password:'',
         });

         const handleChange = (e)=>{
             const {name,value} = e.target;
             const copyloginInfo = {...loginInfo};
             copyloginInfo[name] = value;
             setloginInfo(copyloginInfo);
         };
         const navigate = useNavigate();
         const handleLogin = async(e)=>{
            e.preventDefault();
            const {email,password} = loginInfo;
            if(!email || !password){
                return handleError("all fields are required");
            }
            try {
                const url = "http://localhost:8000/api/user/user-login"
                console.log("payload sent to api:",loginInfo);
                const response = await fetch(url,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify(loginInfo),
                });
                const result = await response.json();
                console.log(result);
                const {status,message,token} = result;
                if (status !== "success") {
                    return handleError(message || "Login failed");
                }
    
                if (status === "success") {
                    handleSuccess(message || "Login successful!");
                    localStorage.setItem('token',token);
                    // Redirect to login after 1 second
                    setTimeout(() => {
                        navigate("/home");
                    }, 1000);
                }
    
                console.log("Login successful:", result);

                
            } catch (error) {
                handleError("an error occured.please try again")
            }
         }









return (
<>
    <div className="grid md:grid-cols-3 bg-green-600">
        <div>

        </div>

       <form onSubmit={handleLogin}>
        <div className="bg-gray-200 mt-56 pt-6 rounded space-y-4 max-auto">
            <p className='text-center text-red-600 animate-ping'>VOTE NOW</p>
            <hr />
            <label htmlFor="email" className="block mb-2 text-center">Email</label>
            <input type="email" name="email" onChange={handleChange} value={loginInfo.email}className="w-full p-2 mb-4 border border-gray-300 rounded" />

            <label htmlFor="password" className="block mb-2 text-center">Password</label>
            <input type="password" name="password" onChange={handleChange} value={loginInfo.password} className="w-full p-2 mb-4 border border-gray-300 rounded" />

            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Login
            </button>
            <div className="grid md:grid-cols-2 space-x-2">
                <div>
                    <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => navigate("/register")}>Register</button>
                </div>
               
                <div>
                    <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Forgot
                        Password</button>
                </div>
            </div>

        </div>
        </form>

        <div>

        </div>
    </div>
</>
);
}

export default Login;
