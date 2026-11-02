import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import c1 from "@/assets/ctf/debate.png";
import c2 from "@/assets/ctf/csc.png";
import c3 from "@/assets/ctf/Fungame.png";
import c4 from "@/assets/ctf/IDcard.png";
import c5 from "@/assets/ctf/intenship.jpg";
import c6 from "@/assets/ctf/SIH.jpg";
import c7 from "@/assets/ctf/dept2023.jpg";

const certificates = [
  {
    date: "JAN 2024",
    title: "Agricultural Department - Tamil Debate",
    issuer: "Government Agricultural Department",
    image: c1,
  },
  {
    date: "FEB 2024",
    title: "Advanced Diploma in Python Programming",
    issuer: "CSC Academy",
    image: c2,
  },
  {
    date: "MAR 2024",
    title: "Agricultural Department - Fun Game",
    issuer: "Government Agricultural Department",
    image: c3,
  },
  {
    date: "APR 2024",
    title: "Innovation Day Project (First Prize)",
    issuer: "Department of Computer Science",
    image: c4,
  },
  {
    date: "MAY 2024",
    title: "Fullstack Development Internship",
    issuer: "Techvolt Software Pvt. Ltd.",
    image: c5,
  },
  {
    date: "AUG 2024",
    title: "Smart India Hackathon 2024 Grand Finale",
    issuer: "Ministry of Education, Govt. of India",
    image: c6,
  },
  {
    date: "JAN 2025",
    title: "Dept First Prize - Class Monitoring System",
    issuer: "Department of Computer Science",
    image: c7,
  },
];

// Animation variants for the slide effect
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
  }),
};

const CertificateGallery = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = certificates.length - 1;
      if (nextIndex >= certificates.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const currentCert = certificates[index];

  return (
    <section
      id="certificates"
      className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden relative"
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex flex-col justify-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Certificates
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Swipe through my professional certifications and achievements.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full h-[500px] flex items-center justify-center">
          
          {/* Left Arrow */}
          <button
            className="absolute left-2 md:left-10 z-20 bg-gray-800/50 hover:bg-purple-600 p-3 rounded-full text-white backdrop-blur-sm transition-all"
            onClick={() => paginate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            className="absolute right-2 md:right-10 z-20 bg-gray-800/50 hover:bg-purple-600 p-3 rounded-full text-white backdrop-blur-sm transition-all"
            onClick={() => paginate(1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Animated Card */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full max-w-lg px-4"
            >
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col items-center text-center">
                {/* Image Container */}
                <div className="w-full h-64 md:h-72 mb-6 overflow-hidden rounded-lg relative group">
                  <motion.img
                    src={currentCert.image}
                    alt={currentCert.title}
                    className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110"
                    onClick={() => setSelectedImage(currentCert.image)}
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="text-white text-sm font-semibold bg-black/50 px-3 py-1 rounded-full">
                      Click to Expand
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-purple-300 uppercase bg-purple-900/30 rounded-full mb-2">
                    {currentCert.date}
                  </span>
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    {currentCert.title}
                  </h3>
                  <p className="text-gray-400 font-medium">{currentCert.issuer}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 gap-2">
          {certificates.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === index ? "bg-purple-500 w-8" : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-5xl max-h-[90vh] w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image itself
            >
              <button
                className="absolute -top-12 right-0 text-white text-xl hover:text-purple-400"
                onClick={() => setSelectedImage(null)}
              >
                Close ✕
              </button>
              <img
                src={selectedImage}
                alt="Full Certificate"
                className="w-full h-full object-contain rounded-lg shadow-2xl border border-gray-700"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Helpers for swipe detection
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default CertificateGallery;