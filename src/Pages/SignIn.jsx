import React, { useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import axios from 'axios';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:4000/admin", {
                params: {
                    email: email,
                    password: password,
                },
            });

            if (res.data.length === 0) {
                alert("Please enter the correct credentials");
            } else {
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
