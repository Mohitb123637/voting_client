import { useEffect } from 'react';
import { candidates } from '../../store/profile/profileAuth';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

const Result = () => {
  const dispatch = useDispatch();
  const {
    candidates: candidateList,
    loading,
    error,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(candidates());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin w-16 h-16 border-4 border-t-4 border-indigo-500 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-bold text-2xl mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen from-blue-50 via-gray-100 to-blue-50  py-12">
      <div className="container mx-auto px-4 text-blue-800">
        <motion.h1
          className="text-6xl font-extrabold text-center mb-12 "
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Election Results
        </motion.h1>

        {candidateList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidateList.map((candidate) => (
              <motion.div
                key={candidate._id}
                className="relative bg-white bg-opacity-20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-transform duration-700 ease-in-out "
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 0.9 }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 opacity-30 rounded-xl  z-0"></div>

                <div className="relative flex flex-col items-center z-10">
                  <motion.img
                    src={candidate.profileImage}
                    alt={candidate.name}
                    className="w-40 h-40 object-cover rounded-full border-4 border-blue-800 shadow-xl mb-6"
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
                    {candidate.name}
                  </h2>
                  <p className="text-lg text-gray-800 mb-2">
                    <span className="font-semibold text-purple-600">
                      Party:{' '}
                    </span>
                    {candidate.party}
                  </p>
                  <p className="text-lg text-gray-800 mb-4">
                    <span className="font-semibold text-purple-600">Age: </span>
                    {candidate.age}
                  </p>

                  {/* Animated Progress Bar */}
                  <div className="w-full bg-gray-300 rounded-full h-8 mb-4 overflow-hidden shadow-inner relative">
                    <motion.div
                      className="absolute top-0 left-0 bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-600 h-full rounded-full animate-pulse"
                      style={{
                        width: `${
                          (candidate.voteCount /
                            candidateList.reduce(
                              (acc, c) => acc + c.voteCount,
                              0
                            )) *
                          100
                        }%`,
                      }}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          (candidate.voteCount /
                            candidateList.reduce(
                              (acc, c) => acc + c.voteCount,
                              0
                            )) *
                          100
                        }%`,
                      }}
                      transition={{ duration: 1 }}
                    />
                  </div>

                  <p className="text-2xl text-purple-600 font-semibold">
                    {candidate.voteCount} Votes
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-2xl text-gray-400">
            No candidates available
          </p>
        )}
      </div>
      <BackButton />
    </div>
  );
};

export default Result;
