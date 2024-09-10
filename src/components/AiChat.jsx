import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegCommentDots, FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { chatSend, getChat } from '../../store/ai/chatAction';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const chatHistory = useSelector((state) => state?.chat?.data);
  console.log(chatHistory, 'Chat History');

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Fetch chat history when the component mounts
  useEffect(() => {
    dispatch(getChat())
      .then((action) => {
        if (action.payload) {
          const historyMessages = [];

          action.payload.forEach((message) => {
            if (message.question) {
              historyMessages.push({
                text: message.question,
                from: 'user',
              });
            }
            if (message.aiResponse) {
              historyMessages.push({
                text: message.aiResponse,
                from: 'ai',
              });
            }
          });

          setMessages(historyMessages);
        }
      })
      .catch((error) => {
        console.error('Error fetching chat history:', error);
      });
  }, [dispatch]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Scroll to bottom when chat modal opens
  useEffect(() => {
    if (isOpen) {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    const trimmedInput = input.trim();
    if (trimmedInput === '') return;

    // Add the user message to the chat
    const newMessage = { text: trimmedInput, from: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');
    setIsLoading(true); // Start loading animation

    try {
      // Dispatch the API call to send the message
      const response = await dispatch(
        chatSend({ question: trimmedInput })
      ).unwrap();

      if (response && response.result) {
        const aiMessage = { text: response.result, from: 'ai' };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      }
    } catch (err) {
      if (
        err &&
        err.error ===
          '[GoogleGenerativeAI Error]: Candidate was blocked due to SAFETY'
      ) {
        const aiMessage = {
          text: 'Do not ask this type of question, or your account may be blocked.',
          from: 'ai',
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } else {
        console.error('Error sending message:', err);
      }
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleDeleteMessages = () => {
    setMessages([]);
  };

  return (
    <div className="relative">
      {/* Chat Icon */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 ease-in-out"
      >
        <FaRegCommentDots className="w-7 h-7" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-0 right-0 w-96 h-[75vh] bg-white shadow-2xl border rounded-lg overflow-hidden z-50"
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-t-lg shadow-md">
              <span className="text-xl font-semibold">Chat with AI</span>
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  onClick={handleDeleteMessages}
                  className="p-2 rounded-full hover:bg-purple-500 transition"
                >
                  <FaRegTrashAlt className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-purple-500 transition"
                >
                  <FaTimes className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-3 max-h-[calc(75vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-2xl shadow-lg transition-all ${
                    message.from === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 text-indigo-900'
                  }`}
                  initial={{
                    opacity: 0,
                    x: message.from === 'user' ? 100 : -100,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {message.text}
                </motion.div>
              ))}

              {/* Loading animation */}
              {isLoading && (
                <div className="flex justify-center mb-5">
                  <motion.div
                    className="text-indigo-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                  >
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                  </motion.div>
                </div>
              )}

              {/* Scroll target */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input and Send Button */}
            <div className="flex items-center p-4 border-t fixed bottom-0 w-96 bg-white">
              <input
                type="text"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Type your message..."
                disabled={isLoading} // Disable input during loading
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3 ml-2 rounded-lg shadow-lg hover:bg-indigo-600 transition transform hover:scale-105"
                disabled={isLoading} // Disable button during loading
              >
                Send
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
