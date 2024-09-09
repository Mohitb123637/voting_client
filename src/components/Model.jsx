/* eslint-disable react/prop-types */
// src/components/Modal.js

import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, onConfirm, candidate, message }) => {
  if (!isOpen) return null;

  // Fallback image if none is provided
  const fallbackImage = '/default-image.png';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors duration-300"
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">{message}</h2>
        <div className="flex items-center mb-6">
          <img
            src={candidate ? candidate.profileImage : fallbackImage}
            alt={candidate ? candidate.name : 'Candidate'}
            className="w-28 h-28 object-cover rounded-full border-4 border-blue-800 mr-6"
          />
          <div>
            <p className="text-xl font-semibold text-gray-800 mb-2">
              {candidate ? candidate.name : ''}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Party:</span>{' '}
              {candidate ? candidate.party : ''}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Age:</span>{' '}
              {candidate ? candidate.age : ''}
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="bg-blue-800 text-white py-2 px-6 rounded-lg hover:bg-blue-900 transition-colors duration-300"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-colors duration-300"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
