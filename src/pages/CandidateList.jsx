import { useEffect, useState } from 'react';
import { candidates } from '../../store/profile/profileAuth';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { MdDelete } from 'react-icons/md';
import BackButton from '../components/BackButton';
import Modal from '../components/Model';
import { deleteCandidate } from '../../store/candidate/candidateAction';

const CandidateList = () => {
  const { profile } = useSelector((state) => state.profile);
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  console.log(profile.user);
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

  const handleVoteClick = (candidate) => {
    setSelectedCandidate({
      ...candidate,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    if (selectedCandidate) {
      await dispatch(deleteCandidate({ candidateID: selectedCandidate._id }));
      await dispatch(candidates());
    }
    setShowModal(false);
  };

  return (
    <div className="min-h-screen from-blue-50 via-gray-100 to-blue-50  py-12">
      <div className="container mx-auto px-4 text-blue-800">
        <motion.h1
          className="text-6xl font-extrabold text-center mb-12 "
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Candidates{' '}
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
                {profile?.user.role === 'admin' ? (
                  <MdDelete
                    size={30}
                    className="absolute top-4 right-4 cursor-pointer text-red-500 hover:text-red-700 transition-transform transform hover:scale-125 hover:shadow-lg"
                    title="Delete Candidate"
                    onClick={() => handleVoteClick(candidate)}
                  />
                ) : null}

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
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        candidate={selectedCandidate}
        message="Confirm Your Vote"
      />
      <BackButton />
    </div>
  );
};

export default CandidateList;
