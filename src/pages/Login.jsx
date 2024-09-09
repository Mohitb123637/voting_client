/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from 'react-router-dom';
import { TextInput, Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/auth/authAction';
import { userProfile } from '../../store/profile/profileAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    adharCardNumber: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profile);

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

  useEffect(() => {
    if (profile) {
      navigate('/');
    }
  }, [profile, navigate]);

  // After login, store the token
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError('');
      const resultAction = await dispatch(loginUser(formData));

      if (loginUser.fulfilled.match(resultAction)) {
        const { token } = resultAction.payload;
        localStorage.setItem('token', token);
        await dispatch(userProfile());
      } else {
        setError(resultAction.payload.error || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-start">
        {/* left */}
        <div className="md:w-1/2">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Voting
            </span>
            App
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
                id="adharCardNumber"
                placeholder="Aadhaar number (XXXX-XXXX-XXXX)"
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
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              outline
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Spinner
                    aria-label="Loading"
                    size="sm"
                    light={true}
                    className="mr-2"
                  />
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>

            <div className="flex gap-2 text-sm mt-5">
              <span>Have an account?</span>
              <Link
                to="/sign-up"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
