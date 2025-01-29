import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import cryptoRandomString from 'crypto-random-string';
import { useDispatch} from 'react-redux';
import { addUsers} from '../redux/slices/userSlice';
import { validateUserDetails } from '../validation/validation';

function AddForm() {
  const random_id = cryptoRandomString({ length: 4 });
  const [inputs, setInputs] = useState({ id: `${random_id}`, name: '', email: '', phone: '' });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };


  const handleSubmit = () => {
    if(validateUserDetails(inputs.name, inputs.email, inputs.phone)){
      dispatch(addUsers(inputs))
      navigate('/landing')
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
            placeholder="Email Id"
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
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
    </div>
  );
}

export default AddForm;
