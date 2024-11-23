// const handleChange = (e)=>{
//         const {name,value} = e.target;
//         // console.log(name,value);
//         const copySignupInfo = {...signupInfo}
//         copySignupInfo[name] = value;
//         setSignupInfo(copySignupInfo);
//     }
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleError,handleSuccess } from '../utils';
import { toast, ToastContainer } from "react-toastify";

function Register() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '', // Updated to match backend parameter
        tc: false, // Updated to match backend parameter
    });

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target; // Destructure type and checked
        const updatedValue = type === "checkbox" ? checked : value; // Determine the value based on input type
        const copySignupInfo = { ...signupInfo }; // Create a copy of the current state
        copySignupInfo[name] = updatedValue; // Update the specific field
        setSignupInfo(copySignupInfo); // Update the state
    };
    
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, password_confirmation, tc } = signupInfo;

        // Validate fields
        if (!name || !email || !password || !password_confirmation) {
            return handleError("All fields are required");
        }

        if (password !== password_confirmation) {
            return handleError("Passwords do not match");
        }

        if (!tc) {
            return handleError("You must agree to the terms and conditions");
        }

        try {
            const url = "http://localhost:8000/api/user/register";
            console.log("Payload Sent to API:", signupInfo); // Debugging payload

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signupInfo),
            });

            const result = await response.json();
            // console.log("API Response:", result);
            const {status,message} = result;
            
            if (status !== "success") {
                return handleError(message || "Registration failed");
            }

            if (status === "success") {
                handleSuccess(message || "Registration successful!");
                // Redirect to login after 1 second
                setTimeout(() => {
                    navigate("/login"); 
                }, 1000);
            }

            console.log("Registration successful:", result);
            // Redirect to login after 1 second
        } catch (err) {
            handleError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
                    Register
                </h2>
                <form onSubmit={handleSignup}>
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={signupInfo.name}
                            className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={signupInfo.email}
                            className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={signupInfo.password}
                            className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Password"
                        />
                    </div>

                    {/* Password Confirmation */}
                    <div className="mb-4">
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-600">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="password_confirmation"
                            onChange={handleChange}
                            value={signupInfo.password_confirmation}
                            className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Confirm your password"
                        />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            name="tc"
                            className="mr-2"
                            onChange={handleChange}
                            checked={signupInfo.tc}
                        />
                        <label htmlFor="tc" className="text-sm text-gray-600">
                            I agree to the{" "}
                            <Link to="#" className="text-blue-500 hover:underline">
                                terms and conditions
                            </Link>.
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
