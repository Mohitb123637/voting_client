/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from 'react-router-dom';
import { TextInput, Button } from 'flowbite-react';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/auth/authAction';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    mobile: '',
    adharCardNumber: '',
    address: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await dispatch(registerUser(formData)).unwrap();
      Navigate('/login');
    } catch (error) {
      // Set the error state and log it
      setError(error.error || 'An error occurred ');
      console.log('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-start">
        {/* left */}
        <div className="md:w-1/2">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Physics
            </span>
            Blog
          </Link>
          <p className="text-gray-600 dark:text-gray-300 mt-5">
            Welcome! Please fill out the form to create your account and start
            voting. It's quick and easy.
          </p>
        </div>
        {/* right */}
        <div className="mt-5 md:mt-0 md:ml-20 md:w-1/2 w-full">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <TextInput
                type="text"
                placeholder="Your name"
                id="name"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <TextInput
                type="number"
                id="age"
                placeholder="Your age"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <TextInput
                type="email"
                placeholder="Your email"
                id="email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <TextInput
                type="tel"
                placeholder="Your contact number"
                id="mobile"
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <TextInput
                type="text"
                id="adharCardNumber"
                placeholder="Aadhaar number (XXXX-XXXX-XXXX)"
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <TextInput
                type="text"
                id="address"
                placeholder="Your address"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <TextInput
                type="text"
                id="role"
                placeholder="Your Role"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 relative">
              <TextInput
                type={showPassword ? 'text' : 'password'}
                placeholder="Your password"
                id="password"
                required
                onChange={handleChange}
              />
              <span
                className="absolute inset-y-0 right-3 top-3 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </span>
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p> // Error message
            )}

            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              outline
              className="w-full"
            >
              Sign Up
            </Button>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an account?</span>
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
