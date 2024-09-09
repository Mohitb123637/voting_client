import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { candidates } from '../../store/profile/profileAuth';
import Modal from '../components/Model';
import { vote } from '../../store/candidate/candidateAction';
import BackButton from '../components/BackButton';

const Vote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const {
    candidates: candidateList,
    loading,
    error,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(candidates());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  const handleVoteClick = (candidate) => {
    setSelectedCandidate({
      ...candidate,
    });
    setShowModal(true);
  };

  const handleConfirmVote = () => {
    if (selectedCandidate) {
      dispatch(vote({ candidateID: selectedCandidate._id }));
    }
    setShowModal(false);
    alert('Thank you for Voting');
    navigate('/');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-blue-800">
          Cast Your Vote for Your Favorite Candidate
        </h1>
        {candidateList.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {candidateList.map((candidate) => (
              <div
                key={candidate._id}
                className="relative bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl  transform hover:scale-105 transition-transform duration-500 ease-in-out w-full sm:w-80 md:w-96 lg:w-1/4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 opacity-30 rounded-xl z-0"></div>
                <div className="relative flex flex-col items-center mb-6 z-10">
                  <img
                    src={candidate.profileImage}
                    alt={candidate.name}
                    className="w-48 h-48 object-cover rounded-full border-4 border-blue-800 shadow-xl"
                  />
                  <div className="text-center mt-6">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                      {candidate.name}
                    </h2>
                    <p className="text-gray-800 mb-1">
                      <span className="font-semibold text-blue-700">
                        Party:
                      </span>{' '}
                      {candidate.party}
                    </p>
                    <p className="text-gray-800 mb-1">
                      <span className="font-semibold text-blue-700">Age:</span>{' '}
                      {candidate.age}
                    </p>
                  </div>
                </div>
                <button
                  className="relative z-20 w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                  onClick={() => handleVoteClick(candidate)}
                >
                  Vote Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-2xl text-gray-700">
            No candidates available
          </p>
        )}
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmVote}
          candidate={selectedCandidate}
          message="Confirm Your Vote"
        />
      </div>
      <BackButton />
    </div>
  );
};

export default Vote;
