import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../src/component/GlassCard";
import "./index.css";

const App: React.FC = () => {
  const [currentText, setCurrentText] = useState("STATIC TEXT 1");
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const textArray = [
    "about",
    "tech",
    "project",
    "contact",
  ];

  const cardHeights = ["80vh", "88vh", "89vh", "95vh"];

  const textStyles: Record<string, React.CSSProperties> = {
    "about": { top: "10%", left: "3%", color: "#ff5733" },
    "tech": { top: "35%", left: "3%", color: "#33ff57" },
    "project": { top: "52%", left: "3%", color: "#5733ff" },
    "contact": { top: "79%", left: "3%", color: "#f5a623" },
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.current.findIndex((card) => card === entry.target);
          if (index !== -1) {
            setCurrentText(textArray[index]);
          }
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToNext = () => {
    const currentIndex = textArray.indexOf(currentText);
    const nextIndex = currentIndex + 1;
    if (nextIndex < cardRefs.current.length) {
      const nextCard = cardRefs.current[nextIndex];
      nextCard?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to a specific card by index
  const scrollToSection = (index: number) => {
    const card = cardRefs.current[index];
    card?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative App">
      {/* Fixed Transparent Navigation Bar */}
      {/* Fixed Transparent Navigation Bar with Background Color */}
      <nav className="top-0 left-0 z-50 fixed flex justify-end space-x-20 bg-gray-900 bg-opacity-50 backdrop-blur-lg p-6 w-full font-fontTwo text-2xl">
        {textArray.map((text, index) => (
          <button
            key={text}
            onClick={() => scrollToSection(index)}
            className="font-semibold text-white hover:text-gray-300 transition-colors"
          >
            {text.replace(/\s/g, '')} {/* Remove spaces for display */}
          </button>
        ))}
      </nav>


      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="z-[-1] fixed inset-0 w-full h-full object-cover"
      >
        <source src="/bg1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Vertical Text Section with Infinite Scrolling */}
      <div className="top-0 left-40 absolute w-16 h-full overflow-hidden">
        <motion.div
          className="flex flex-col items-center"
          animate={{ y: ["0%", "-100%"] }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...Array(30)].map((_, index) => (
            <div
              key={index}
              className="font-fontTwo text-[#209fde] text-4xl whitespace-nowrap"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              - WEB INTERFACE DEVELOPER
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dynamic Static Vertical Text Section with Animation */}
      <div
        className="absolute flex flex-col items-center transform -translate-y-1/2"
        style={{
          ...textStyles[currentText],
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          position: "absolute",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentText}
            className="font-fontOne text-9xl whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {currentText}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col items-center space-y-12 mt-20 pt-16">
        {textArray.map((_, index) => (
          <GlassCardWrapper
            key={index}
            cardRef={(el) => (cardRefs.current[index] = el)}
            height={cardHeights[index]}
          >
            <h2 className="mb-2 font-bold text-2xl text-white">
              Card {index + 1}
            </h2>
            <p className="text-white">This is card {index + 1} content.</p>
          </GlassCardWrapper>
        ))}
      </div>

      {/* Stylish Animated Next Button */}
      <motion.button
        onClick={scrollToNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="right-10 bottom-10 fixed flex justify-center items-center bg-gradient-to-r shadow-lg rounded-full w-16 h-16 animate-bounce focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="5 12 12 19 19 12" />
        </svg>
      </motion.button>
    </div>
  );
};

const GlassCardWrapper: React.FC<{
  children: React.ReactNode;
  cardRef?: React.Ref<HTMLDivElement>;
  height?: string;
}> = ({ children, cardRef, height }) => {
  return (
    <div
      ref={cardRef}
      className="mt-[-60px] ml-[-700px] w-[700px]"
      style={{ height }}
    >
      <GlassCard>{children}</GlassCard>
    </div>
  );
};

export default App;
