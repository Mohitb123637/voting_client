import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname !== '/') {
      navigate(-1);
    }
  };

  return (
    <Button
      onClick={handleBack}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-2 rounded-full shadow-2xl opacity-70 hover:opacity-100 hover:scale-105 transform transition-all duration-300 ease-in-out hover:from-purple-500 hover:to-indigo-500  hover:shadow-indigo-500/50 focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50 focus:outline-none"
      style={{ transition: 'opacity 0.3s, transform 0.3s' }}
    >
      <FaArrowLeft className="text-2xl" />
    </Button>
  );
};

export default BackButton;
