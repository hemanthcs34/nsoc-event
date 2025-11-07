import { motion } from 'framer-motion';
import './PhaseCards.css';

/**
 * PhaseCards - Animated event phase cards with sequential boot lighting
 */
const PhaseCards = () => {
  const phases = [
    {
      id: 1,
      number: '01',
      title: 'Component Quest',
      tagline: 'Earn. Buy. Build.',
      description: 'Answer quiz challenges to earn virtual currency. Use it strategically to purchase essential IoT components.',
      duration: '35 min',
      color: 'cyan',
      icon: '💰',
    },
    {
      id: 2,
      number: '02',
      title: 'System Genesis',
      tagline: 'Map the Flow.',
      description: 'Assemble your purchased components into a functional IoT architecture. Precision and understanding are key.',
      duration: '20 min',
      color: 'purple',
      icon: '🔧',
    },
    {
      id: 3,
      number: '03',
      title: 'Neural Logic',
      tagline: 'Debug the Mind.',
      description: 'Restore corrupted control code. Analyze, correct, and relaunch the program that governs Neurovia.',
      duration: '25 min',
      color: 'magenta',
      icon: '🧬',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const hoverVariants = {
    rest: { y: 0, scale: 1 },
    hover: {
      y: -12,
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="phases-section" id="phases">
      <motion.div
        className="phases-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className="phases-header" variants={cardVariants}>
          <h2 className="phases-title">
            <span className="neon-text">Mission Protocol</span>
          </h2>
          <p className="phases-subtitle">
            Three phases. One goal: Restore Neurovia to full power.
          </p>
        </motion.div>

        <motion.div
          className="phases-grid"
          variants={containerVariants}
        >
          {phases.map((phase) => (
            <motion.div
              key={phase.id}
              className={`phase-card phase-${phase.color}`}
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
            >
              <motion.div
                className="phase-card-inner"
                variants={hoverVariants}
              >
                {/* Phase Number Badge */}
                <div className="phase-number">
                  <span>{phase.number}</span>
                </div>

                {/* Icon */}
                <div className="phase-icon">
                  {phase.icon}
                </div>

                {/* Title */}
                <h3 className="phase-title">{phase.title}</h3>

                {/* Tagline */}
                <p className="phase-tagline">{phase.tagline}</p>

                {/* Description */}
                <p className="phase-description">{phase.description}</p>

                {/* Duration Badge */}
                <div className="phase-duration">
                  <span className="duration-icon">⏱</span>
                  <span className="duration-text">{phase.duration}</span>
                </div>

                {/* Animated border glow */}
                <div className="phase-glow"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PhaseCards;
