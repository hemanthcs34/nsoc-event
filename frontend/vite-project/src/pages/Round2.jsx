import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Round2.css';

const Round2 = () => {
  const [teamId] = useState(localStorage.getItem('teamId') || 'TEAM-001');
  const [sector] = useState(localStorage.getItem('sector') || 'Lumina District');
  const [purchasedComponents, setPurchasedComponents] = useState([]);
  const [schematicSlots, setSchematicSlots] = useState([
    { id: 1, label: 'Input Layer', component: null, correctType: 'sensor' },
    { id: 2, label: 'Signal Processing', component: null, correctType: 'signal' },
    { id: 3, label: 'Control Unit', component: null, correctType: 'controller' },
    { id: 4, label: 'Communication', component: null, correctType: 'communication' },
    { id: 5, label: 'Data Storage', component: null, correctType: 'cloud' },
    { id: 6, label: 'Output Layer', component: null, correctType: 'actuator' }
  ]);
  const [timeRemaining, setTimeRemaining] = useState(20 * 60); // 20 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [draggedComponent, setDraggedComponent] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Correct component flow
  const correctFlow = ['sensor', 'signal', 'controller', 'communication', 'cloud', 'actuator'];

  // Load purchased components from Round 1
  useEffect(() => {
    const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    
    // If no purchases found, use test components for demo
    if (purchases.length === 0) {
      const testComponents = [
        { code: 'SENSOR1', name: 'Multi-Sensor Module', icon: '📡', type: 'sensor', price: 300 },
        { code: 'SIGNAL1', name: 'Signal Conditioning Unit', icon: '⚡', type: 'signal', price: 200 },
        { code: 'MCU1', name: 'Microcontroller Board', icon: '🧠', type: 'controller', price: 400 },
        { code: 'COMM1', name: 'WiFi Module', icon: '📶', type: 'communication', price: 250 },
        { code: 'CLOUD1', name: 'Cloud Database Token', icon: '☁️', type: 'cloud', price: 350 },
        { code: 'ACT1', name: 'Relay Actuator', icon: '🔌', type: 'actuator', price: 200 }
      ];
      setPurchasedComponents(testComponents);
      // Store test components for later use
      localStorage.setItem('purchases', JSON.stringify(testComponents));
    } else {
      setPurchasedComponents(purchases);
    }
  }, []);

  // Timer
  useEffect(() => {
    if (isSubmitted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isSubmitted]);

  // Scroll to top handler
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDragStart = (component) => {
    setDraggedComponent(component);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (slotId) => {
    if (!draggedComponent) return;

    setSchematicSlots(prev =>
      prev.map(slot =>
        slot.id === slotId
          ? { ...slot, component: draggedComponent }
          : slot
      )
    );
    setDraggedComponent(null);
  };

  const handleRemoveComponent = (slotId) => {
    setSchematicSlots(prev =>
      prev.map(slot =>
        slot.id === slotId
          ? { ...slot, component: null }
          : slot
      )
    );
  };

  const calculateScore = () => {
    let correctPlacements = 0;
    let missingComponents = 0;
    let wrongComponents = 0;

    schematicSlots.forEach(slot => {
      if (!slot.component) {
        missingComponents++;
      } else if (slot.component.type === slot.correctType) {
        correctPlacements++;
      } else {
        wrongComponents++;
      }
    });

    const placementScore = correctPlacements * 5;
    const timeTaken = Math.ceil((20 * 60 - timeRemaining) / 60);
    const timeScore = Math.max(0, 20 - timeTaken);
    const penalty = (missingComponents + wrongComponents) * 5;

    const totalScore = Math.max(0, placementScore + timeScore - penalty);

    return {
      placementScore,
      timeScore,
      penalty,
      totalScore,
      correctPlacements,
      missingComponents,
      wrongComponents,
      timeTaken
    };
  };

  const handleAutoSubmit = () => {
    const scoreData = calculateScore();
    setScore(scoreData);
    setIsSubmitted(true);
    
    // Store score
    const round2Score = scoreData.totalScore;
    localStorage.setItem('round2Score', round2Score);
    localStorage.setItem('round2Details', JSON.stringify(scoreData));
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit? You cannot change your schematic after submission.')) {
      handleAutoSubmit();
    }
  };

  const isAllSlotsValid = schematicSlots.every(slot => slot.component !== null);

  return (
    <div className="round2-container">
      <div className="round2-header">
        <motion.div 
          className="round2-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>⚙️ ROUND 2: SYSTEM GENESIS</h1>
          <p className="round2-subtitle">Map the IoT Data Flow</p>
        </motion.div>

        <div className="round2-info">
          <div className="info-card">
            <span className="info-label">Team ID:</span>
            <span className="info-value">{teamId}</span>
          </div>
          <div className="info-card">
            <span className="info-label">Sector:</span>
            <span className="info-value">{sector}</span>
          </div>
          <div className={`info-card timer ${timeRemaining < 300 ? 'warning' : ''}`}>
            <span className="info-label">⏱️ Time:</span>
            <span className="info-value">{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </div>

      {!isSubmitted ? (
        <div className="round2-content">
          {/* Instructions */}
          <motion.div 
            className="instructions-panel"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>📋 Instructions</h3>
            <ul>
              <li>Drag and drop your purchased components into the correct slots</li>
              <li>Build the correct IoT data flow from input to output</li>
              <li>Each correct placement earns <strong>5 points</strong></li>
              <li>Missing or wrong components cost <strong>-5 points</strong> each</li>
              <li>Time bonus: <strong>20 - minutes taken</strong></li>
              <li>Complete within 20 minutes</li>
            </ul>
            <div className="cheatsheet">
              <h4>💡 Correct Flow:</h4>
              <div className="flow-hint">
                Sensor → Signal Conditioning → Controller → Communication → Cloud/DB → Actuator
              </div>
            </div>
          </motion.div>

          {/* Component Palette */}
          <motion.div 
            className="component-palette"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>🧩 Your Components</h3>
            <div className="palette-grid">
              {purchasedComponents.length === 0 ? (
                <div className="no-components">
                  <p>⚠️ No components purchased in Round 1</p>
                  <p className="hint">You need 6 components to complete the schematic</p>
                </div>
              ) : (
                purchasedComponents.map((component, index) => (
                  <motion.div
                    key={index}
                    className={`palette-component ${component.type}`}
                    draggable
                    onDragStart={() => handleDragStart(component)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="component-icon">{component.icon}</div>
                    <div className="component-name">{component.name}</div>
                    <div className="component-type">{component.type}</div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Schematic Builder */}
          <motion.div 
            className="schematic-builder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3>🔧 IoT System Schematic</h3>
            <div className="schematic-flow">
              {schematicSlots.map((slot, index) => (
                <div key={slot.id} className="slot-container">
                  <motion.div
                    className={`schematic-slot ${slot.component ? 'filled' : 'empty'}`}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(slot.id)}
                    whileHover={{ scale: slot.component ? 1 : 1.02 }}
                  >
                    <div className="slot-label">{slot.label}</div>
                    {slot.component ? (
                      <div className={`placed-component ${slot.component.type}`}>
                        <div className="component-icon">{slot.component.icon}</div>
                        <div className="component-name">{slot.component.name}</div>
                        <button 
                          className="remove-btn"
                          onClick={() => handleRemoveComponent(slot.id)}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="empty-slot-placeholder">
                        Drop component here
                      </div>
                    )}
                  </motion.div>
                  {index < schematicSlots.length - 1 && (
                    <div className="flow-arrow">→</div>
                  )}
                </div>
              ))}
            </div>

            <div className="submit-section">
              <button 
                className={`submit-btn ${isAllSlotsValid ? 'ready' : 'disabled'}`}
                onClick={handleSubmit}
                disabled={!isAllSlotsValid}
              >
                {isAllSlotsValid ? '✓ Submit Schematic' : '⚠ Fill All Slots to Submit'}
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div 
          className="results-panel"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2>📊 Round 2 Results</h2>
          <div className="score-breakdown">
            <div className="score-item">
              <span>Correct Placements:</span>
              <span className="score-value">
                {score.correctPlacements} × 5 = <strong>+{score.placementScore}</strong>
              </span>
            </div>
            <div className="score-item">
              <span>Time Taken:</span>
              <span className="score-value">
                {score.timeTaken} min → <strong>+{score.timeScore}</strong>
              </span>
            </div>
            <div className="score-item penalty">
              <span>Missing/Wrong Components:</span>
              <span className="score-value">
                {score.missingComponents + score.wrongComponents} × 5 = <strong>-{score.penalty}</strong>
              </span>
            </div>
            <div className="score-total">
              <span>Total Round 2 Score:</span>
              <span className="total-value">{score.totalScore}</span>
            </div>
          </div>

          <div className="schematic-review">
            <h3>Your Schematic:</h3>
            <div className="review-flow">
              {schematicSlots.map((slot, index) => (
                <div key={slot.id} className="review-slot">
                  <div className={`review-component ${
                    slot.component?.type === slot.correctType ? 'correct' : 'incorrect'
                  }`}>
                    <div className="component-icon">
                      {slot.component ? slot.component.icon : '❌'}
                    </div>
                    <div className="component-name">
                      {slot.component ? slot.component.name : 'Missing'}
                    </div>
                    <div className="validation-status">
                      {slot.component?.type === slot.correctType ? '✓ Correct' : '✗ Wrong/Missing'}
                    </div>
                  </div>
                  {index < schematicSlots.length - 1 && <span className="flow-arrow">→</span>}
                </div>
              ))}
            </div>
          </div>

          <button 
            className="next-round-btn"
            onClick={() => window.location.href = '/round3'}
          >
            Proceed to Round 3: Neural Logic →
          </button>
        </motion.div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          className="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ↑
        </motion.button>
      )}
    </div>
  );
};

export default Round2;
