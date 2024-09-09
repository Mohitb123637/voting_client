/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../../store/profile/profileAuth';
import { Button, Spinner } from 'flowbite-react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <Spinner color="purple" aria-label="Loading" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12">
      <div className="container mx-auto px-6">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <motion.div
            className="flex items-center p-8 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <FaUserCircle size={90} className="text-gray-200" />
            <div className="ml-8">
              <h1 className="text-6xl font-extrabold leading-tight">
                {profile?.user.name}
              </h1>
              <p className="text-xl font-medium mt-2">{profile?.user.email}</p>
            </div>
          </motion.div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Details Card */}
              <motion.div
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-4xl font-semibold text-gray-800 mb-5">
                  Details
                </h2>
                <ul className="space-y-4">
                  {[
                    { label: 'Age', value: profile?.user.age },
                    { label: 'Mobile', value: profile?.user.mobile },
                    { label: 'Address', value: profile?.user.address },
                    {
                      label: 'Aadhaar Number',
                      value: profile?.user.adharCardNumber,
                    },
                    { label: 'Role', value: profile?.user.role },
                  ].map(({ label, value }) => (
                    <li key={label} className="text-gray-700 flex items-center">
                      <span className="font-semibold w-40 text-gray-600">
                        {label}:
                      </span>{' '}
                      {value}
                    </li>
                  ))}
                </ul>
              </motion.div>
              {/* Additional Info Card */}
              <motion.div
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-4xl font-semibold text-gray-800 mb-5">
                  Why You Should Vote
                </h2>
                <p className="text-gray-700 text-lg">
                  Voting is a fundamental right in any democracy. It allows you
                  to voice your opinion on who should represent you in
                  government, and influence key policies that affect your life
                  and community. Every vote matters, and your participation
                  shapes the future.
                </p>
                <p className="text-gray-700 text-lg mt-4">
                  By voting, you’re taking part in a crucial decision-making
                  process, ensuring that the leaders and laws reflect the will
                  of the people. Don’t miss the chance to make your voice heard!
                </p>
              </motion.div>
            </div>

            {/* Voting Section */}
            <div className="mt-10 flex justify-center">
              {profile?.user.isvoted ? (
                <motion.div
                  className="bg-gradient-to-r from-green-100 to-green-50 p-8 rounded-2xl shadow-lg border border-green-200 text-green-900 max-w-lg mx-auto flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <p className="text-3xl font-extrabold text-center mb-4">
                    You have already voted!
                  </p>
                  <Button
                    size="lg"
                    className=" text-white font-semibold text-2xl py-2 px-4 rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out focus:ring-4 focus:ring-green-300"
                    gradientDuoTone="purpleToBlue"
                    onClick={() => navigate('/result')}
                  >
                    See Result
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-col items-center mt-4 space-y-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                  <p className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    You haven't voted yet. Do you want to vote?
                  </p>
                  <button className="relative group bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white py-4 px-10 rounded-full shadow-xl transform transition-all duration-500 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300">
                    <Link
                      to="/vote"
                      className="relative z-10 text-2xl font-semibold tracking-wider"
                    >
                      Vote Now
                    </Link>
                    <div className="absolute inset-0 bg-white opacity-10 rounded-full blur-lg transition-all duration-500 group-hover:opacity-20"></div>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        <BackButton />
      </div>
    </div>
  );
};

export default Home;
