'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Extend the loader presence slightly longer to showcase the animation
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = 'unset';
    }, 4000); 

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Animation constants
  const animDuration = 1.0; // Faster total cycle (1s)
  const animRepeat = Infinity;
  // Use offsets to create a "trailing" wave effect
  // Cycle: Red -> TR -> BR -> Mid. 
  
  // To make it smoother/trailing, we let them overlap.
  // We use opacity [0.2, 1, 0.2] so it never fully disappears, maintaining "presence"
  const animValues = { opacity: [0.1, 1, 0.1] };
  const animTimes = [0, 0.4, 1]; // Fast attack, slower decay

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { 
                duration: 0.8, 
                ease: "easeOut" 
              }
            }}
            exit={{ scale: 1.1, opacity: 0 }}
            className="w-24 h-24 md:w-32 md:h-32"
          >
            {/* Inline SVG of the CR Logo (No Text) */}
            <svg
              viewBox="0 0 56 59"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-2xl"
            >
              {/* Left Red Block */}
              <motion.path
                animate={animValues}
                transition={{ duration: animDuration, times: animTimes, repeat: animRepeat, delay: 0, ease: "easeInOut" }}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.7534 17.5496C17.068 20.2652 14.6585 24.6316 14.6585 29.4955C14.6585 34.3594 17.0676 38.6303 20.7526 41.2007L20.4627 41.2064V41.2075L2.51074 41.5613C0.898396 37.9745 0 33.9901 0 29.7846C0 25.5792 0.898396 21.5593 2.51074 17.909L20.6162 17.5522H20.6166L20.7534 17.5496Z"
                fill="#FF0000"
              />
              
              {/* Top Right Block */}
              <motion.path
                animate={animValues}
                transition={{ duration: animDuration, times: animTimes, repeat: animRepeat, delay: 0.15, ease: "easeInOut" }}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M29.2029 0.00574526C41.1598 -0.230097 51.476 6.81721 55.9839 17.0567L37.9276 17.4127C35.4943 15.6288 32.4718 14.6 29.2029 14.6646C26.0391 14.727 23.1061 15.8046 20.7148 17.5783V17.5499H20.7284V1.43176C23.4123 0.561337 26.2575 0.06395 29.2029 0.00574526Z"
                fill="#2B2A29"
              />

              {/* Bottom Right Block */}
              <motion.path
                animate={animValues}
                transition={{ duration: animDuration, times: animTimes, repeat: animRepeat, delay: 0.3, ease: "easeInOut" }}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.7148 41.1739C23.1061 42.8535 26.0391 43.8154 29.2029 43.753C32.4714 43.6888 35.4939 42.5409 37.9272 40.661L55.9839 40.305C51.4757 50.7221 41.1598 58.1761 29.2029 58.4119C26.2575 58.4701 23.4123 58.0846 20.7284 57.32V41.2022H20.7148V41.1739Z"
                fill="#2B2A29"
              />

              {/* CR Middle Parts */}
              <motion.path
                animate={animValues}
                transition={{ duration: animDuration, times: animTimes, repeat: animRepeat, delay: 0.45, ease: "easeInOut" }}
                fillRule="evenodd" 
                clipRule="evenodd" 
                fill="#2B2A29"
                d="M39.1578 34.7392C38.1812 36.7167 36.8372 38.2451 35.1201 39.3185C33.4035 40.3919 31.4082 40.9509 29.1454 40.9955C27.4651 41.0287 25.9109 40.7339 24.4932 40.116C23.0706 39.498 21.7999 38.5675 20.671 37.3142C19.7155 36.2775 18.991 35.0896 18.5027 33.7497C18.0091 32.4156 17.7623 30.9763 17.7623 29.4381C17.7623 27.8786 18.0616 26.3921 18.655 24.9786C19.2484 23.5703 20.1199 22.2774 21.2697 21.1046C22.3567 20.0172 23.5642 19.185 24.8923 18.6127C26.2208 18.0352 27.6488 17.734 29.1768 17.7041C31.4714 17.6588 33.4874 18.16 35.2305 19.2122C36.9683 20.2648 38.2757 21.7773 39.1578 23.7499L35.3408 23.8251C34.6216 22.8469 33.7395 22.1137 32.6944 21.6303C31.6498 21.1518 30.4683 20.9232 29.1454 20.9492C28.0898 20.97 27.0818 21.1896 26.1317 21.6073C25.1758 22.0253 24.3307 22.6247 23.5956 23.3954C22.8238 24.2034 22.2251 25.1339 21.7946 26.1873C21.3642 27.2406 21.1491 28.3106 21.1491 29.4029C21.1491 30.5685 21.3434 31.6725 21.7315 32.7043C22.1201 33.7361 22.6821 34.6281 23.4119 35.37C24.1784 36.1581 25.0658 36.7601 26.0685 37.1816C27.0765 37.6026 28.1004 37.8029 29.1454 37.7825C30.4263 37.7572 31.5814 37.4926 32.6105 36.9843C33.645 36.4755 34.4901 35.7552 35.1568 34.8178L39.1578 34.7392ZM44.3543 29.4029L45.7769 29.3749C47.6927 29.3372 49.124 28.9993 50.0621 28.3571C50.9998 27.7146 51.4666 26.7588 51.4666 25.4888C51.4666 24.2548 51.0625 23.3519 50.2594 22.7887C49.4517 22.226 48.1773 21.964 46.4319 21.9984L44.3543 22.0393V29.4029ZM44.3543 38.6064L41.5812 38.6609V19.5183L47.105 19.4095C49.398 19.3641 51.1525 19.8589 52.3638 20.8941C53.571 21.9338 54.1769 23.4566 54.1769 25.4624C54.1769 27.0241 53.6697 28.3352 52.6602 29.4052C51.6461 30.4706 50.3403 31.0572 48.7472 31.1695L54.1769 38.4126L50.7039 38.481L44.3543 29.717V38.6064Z"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
