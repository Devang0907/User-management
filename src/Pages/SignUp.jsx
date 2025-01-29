import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate=useNavigate();

    const handleSubmit =async (e) => {
        e.preventDefault();
        try{

            const res=await axios.get(import.meta.env.VITE_ADMIN_BACKEND_URL,{params:{
                email:email
            }})

            if(res.data.length===0){
               let salt = bcrypt.genSaltSync(10);
               let hash = bcrypt.hashSync(password, salt); 

               await axios.post(import.meta.env.VITE_ADMIN_BACKEND_URL,{email,hash});
               alert("You are register as admin.")
               navigate('/')
            }
            else{
                alert("Admin already exist")
            }     
        }
        catch(err){
          console.log(err)
        }
       
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="w-1/3 mb-10">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4">
                    Sign Up
                </button>
            </form>
            <p className="mb-4">Already have an account?  <Link className='text-blue-500' to='/'>Sign In</Link></p>
        </div>
    );
};

export default SignUp;