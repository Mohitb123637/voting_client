import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spinner, TextInput } from 'flowbite-react';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';
import { createCandidate } from '../../store/admin/adminAction';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, createdCandidates } = useSelector(
    (state) => state.candidate
  );

  const [formData, setFormData] = useState({
    name: '',
    party: '',
    age: '',
    profileImage: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCandidate(formData));
    alert('Candidate has been Created Successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 py-12 flex items-center justify-center">
      <motion.div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-10 md:p-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-12 text-center">
          Create a Candidate
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spinner color="purple" aria-label="Loading" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Name Input */}
              <div className="relative">
                <TextInput
                  id="name"
                  name="name"
                  placeholder=" "
                  required
                  onChange={handleChange}
                  className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent p-4 text-gray-900 focus:border-purple-500 focus:ring-0 transition-all duration-300"
                />
                <label
                  htmlFor="name"
                  className="absolute top-4 left-2 z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
                >
                  Candidate Name
                </label>
              </div>

              {/* Party Input */}
              <div className="relative">
                <TextInput
                  id="party"
                  name="party"
                  placeholder=" "
                  required
                  onChange={handleChange}
                  className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent p-4 text-gray-900 focus:border-purple-500 focus:ring-0 transition-all duration-300"
                />
                <label
                  htmlFor="party"
                  className="absolute top-4 left-2 z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
                >
                  Party Name
                </label>
              </div>

              {/* Age Input */}
              <div className="relative">
                <TextInput
                  id="age"
                  name="age"
                  type="number"
                  placeholder=" "
                  required
                  onChange={handleChange}
                  className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent p-4 text-gray-900 focus:border-purple-500 focus:ring-0 transition-all duration-300"
                />
                <label
                  htmlFor="age"
                  className="absolute top-4 left-2 z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
                >
                  Candidate Age
                </label>
              </div>

              {/* Profile Image Input */}
              <div className="relative">
                <TextInput
                  id="profileImage"
                  name="profileImage"
                  placeholder=" "
                  required
                  onChange={handleChange}
                  className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent p-4 text-gray-900 focus:border-purple-500 focus:ring-0 transition-all duration-300"
                />
                <label
                  htmlFor="profileImage"
                  className="absolute top-4 left-2 z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
                >
                  Profile Image URL
                </label>
              </div>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="bg-red-100 text-red-600 p-4 rounded-md shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {error}
              </motion.div>
            )}

            {/* Success Message */}
            {createdCandidates && (
              <motion.div
                className="bg-green-100 text-green-600 p-4 rounded-md shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Candidate {createdCandidates.name} successfully created!
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <Button
                type="submit"
                gradientDuoTone="cyanToBlue"
                className="text-lg px-8 py-4 font-bold shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                Create Candidate
              </Button>
            </motion.div>
          </form>
        )}

        {/* Back Button */}
        <div className="mt-12">
          <BackButton />
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
