import { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import './Hero.css';

/**
 * Hero - Main landing section with console typing and CTAs
 */
const Hero = ({ onEnterSimulation, onRegister }) => {
  const [glitchActive, setGlitchActive] = useState(false);

  // Trigger glitch effect periodically
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const consoleLines = [
    '[BOOT SEQUENCE INITIATED...]',
    '[CORE POWER LEVEL: 12%]',
    '[NEUROVIA SYSTEM FAILURE DETECTED]',
    '[ENTERING RESTORATION MODE...]',
  ];

  return (
    <motion.section
      className="hero-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="hero-content glass-panel" variants={itemVariants}>
        {/* Main Title with Glitch Effect */}
        <motion.h1
          className={`hero-title ${glitchActive ? 'glitch active' : 'glitch'}`}
          data-text="🧠 TECHSYMPHONY: REBOOT NEUROVIA"
          variants={itemVariants}
        >
          🧠 TECHSYMPHONY: REBOOT NEUROVIA
        </motion.h1>

        {/* Subtitle */}
        <motion.p className="hero-subtitle neon-text" variants={itemVariants}>
          "The planet that runs on circuits is collapsing — and you hold the last spark."
        </motion.p>

        {/* Console Boot Sequence */}
        <motion.div className="console-box" variants={itemVariants}>
          <div className="console-header">
            <span className="console-dot red"></span>
            <span className="console-dot yellow"></span>
            <span className="console-dot green"></span>
            <span className="console-title">NEUROVIA TERMINAL v2.3.7</span>
          </div>
          <div className="console-body">
            <div className="console-line">
              <span className="console-prompt">$</span>
              <span className="console-text">
                <Typewriter
                  words={consoleLines}
                  loop={1}
                  cursor
                  cursorStyle="_"
                  typeSpeed={50}
                  deleteSpeed={30}
                  delaySpeed={1200}
                />
              </span>
            </div>
          </div>
        </motion.div>

        {/* Subtext */}
        <motion.div className="hero-description" variants={itemVariants}>
          <p>Core systems offline. Energy links broken.</p>
          <p>
            Only those who understand circuits, logic, and code can restore the
            robotic pulse of Neurovia.
          </p>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div className="hero-cta" variants={itemVariants}>
          <motion.button
            className="btn-neon btn-primary"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
              onClick={onRegister}
          >
            <span className="btn-icon">⚡</span>
            Enter Simulation
          </motion.button>
          <motion.button
            className="btn-neon btn-secondary"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('phases')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="btn-icon">🧩</span>
            View Event Phases
          </motion.button>
         
        </motion.div>

        {/* Event Quick Info */}
        <motion.div className="hero-info" variants={itemVariants}>
          <div className="info-badge">
            <span className="info-label">DATE</span>
            <span className="info-value">10 NOV 2025</span>
          </div>
          <div className="info-badge">
            <span className="info-label">TIME</span>
            <span className="info-value">5:30 PM</span>
          </div>
          <div className="info-badge">
            <span className="info-label">VENUE</span>
            <span className="info-value">SIR MV HALL</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
