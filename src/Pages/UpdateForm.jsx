import React, { useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { updateUsers } from '../redux/slices/userSlice';
import { validateUserDetails } from '../validation/validation';

function UpdateForm() {
    const { id } = useParams();

    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({ id: `${id}`, name: "", email: "", phone: "" });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = () => {
        if (validateUserDetails(inputs.name, inputs.email, inputs.phone)) {
            dispatch(updateUsers(inputs));
            navigate('/landing');
        }
            
        

    };

    return (
        <div className="w-full max-w-xl mx-auto mt-20">
            <form
                className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input
                        className="rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        value={inputs.name}
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={inputs.email}
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="phone"
                    >
                        Phone Number
                    </label>
                    <input
                        className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        value={inputs.phone}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <input
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    />
                </div>
            </form>
        </div>
    );
}

export default UpdateForm;
