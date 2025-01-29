import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { SignJWT } from "jose";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:4000/admin", {
                params: {
                    email: email
                },
            });

            if(res.data.length==0){
                alert("No such Email found.")
            }

            const storedHash = res.data[0].hash;
            const isMatch = await bcrypt.compare(password, storedHash);
        
            if (!isMatch) {
                // Password is incorrect, throw an error
                alert("Incorrect Password")
            }
            else {
                const admin_email=res.data[0].email;
                const admin_id=res.data[0].id;
                // Password is correct, generate a new JWT
                const token = generateToken(admin_id , admin_email);

                // Store the JWT in local storage
                localStorage.setItem('token', token);
                //navigate to landing page
                navigate('/landing');
            }


        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="w-1/3">
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2">
                        Email
                    </label>
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
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded w-full py-2 px-3"
                        required
                    />
                </div>

                <p className="mb-4">Don't have an account?  <Link className='text-blue-500' to='/signup'>Sign Up</Link></p>


                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded py-2 px-4">
                    Login
                </button>
            </form>
        </div>
    );
}

export default SignIn;


async function generateToken(id,email) {
    const secretKey = new TextEncoder().encode(import.meta.env.VITE_SECRETKEY); 
   
    const jwt = await new SignJWT({ id : id, email : email}) // Payload
        .setProtectedHeader({ alg: "HS256" }) // Algorithm
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(secretKey);
        
    return jwt;
}