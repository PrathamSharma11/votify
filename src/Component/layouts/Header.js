import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { handleSuccess } from '../../utils';

function Header() {
    const navigate = useNavigate();
    const handleLogout = (e)=>{
          localStorage.removeItem('token');
          handleSuccess('userLoggedout');
          setTimeout(()=>{
            navigate('/login');
          },1000)

    }
return (
<>
    <nav className='bg-gray-800 fixed top-0 left-0 right-0 z-50 shadow-lg'>
        <div className='container flex mx-auto items-center justify-between py-4 px-6'>
            <Link to="/" className="flex items-center space-x-2">
            <img className='w-20 h-20' src="/vote.svg" alt="Desktop Logo" />
            </Link>


            <div className='flex space-x-6'>
                <Link to = "/home" className='text-white hover:text-yellow-200'>HOME</Link>
                <Link to="/about" className="text-white hover:text-yellow-400">ABOUT</Link>
                <Link to="/profile" className="text-white hover:text-yellow-400">PROFILE</Link>
                <Link to="/livecounting" className="text-white hover:text-yellow-400">LIVE COUNTING</Link>
                <Link to="/adminlogin" className="text-white hover:text-yellow-400">ADMIN LOGIN</Link>
                <Link to="/logout" onClick={handleLogout} className="text-white hover:text-yellow-400">LOGOUT</Link>
                <Link to= "/changePassword"
                    className='text-white hover:bg-yellow-400 hover:text-gray-800 border border-yellow-200 px-2 py-0 rounded transition'>
                Change Password</Link>
            </div>


        </div>
    </nav>
</>
)
}

export default Header

// justify-between py-4 px-6 //right side menu shift hogya h
// space-x-6 //space aagyi h between menus
