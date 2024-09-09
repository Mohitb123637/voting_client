/* eslint-disable react/prop-types */

import { Modal, Button } from 'flowbite-react';
import { motion } from 'framer-motion';

const LogOutModal = ({ show, onClose, onLogout }) => {
  return (
    <Modal show={show} onClose={onClose} size="md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Modal.Header className="flex justify-center">
          <h3 className="text-2xl font-extrabold text-gray-800 dark:text-white">
            Confirm Logout
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center py-4 px-6">
            <p className="text-lg text-gray-500 dark:text-gray-300 leading-relaxed">
              Are you sure you want to log out?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between px-6 py-4">
          <Button
            onClick={onLogout}
            gradientDuoTone="pinkToOrange"
            className="w-full text-lg font-semibold py-2 transition-transform hover:scale-105"
          >
            Yes, Logout
          </Button>
          <Button
            color="gray"
            onClick={onClose}
            className="w-full ml-4 text-lg font-semibold py-2 transition-transform hover:scale-105"
          >
            No
          </Button>
        </Modal.Footer>
      </motion.div>
    </Modal>
  );
};

export default LogOutModal;
