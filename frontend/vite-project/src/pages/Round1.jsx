import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import QuizRunner from '../components/QuizRunner';
import ComponentStore from '../components/ComponentStore';
import { quizQuestions, componentStore } from '../data/quizData';
import './Round1.css';

const Round1 = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('intro'); // intro, quiz, store, complete
  const [quizResults, setQuizResults] = useState(null);
  const [purchaseResults, setPurchaseResults] = useState(null);

  const BONUS_AMOUNT = 1200;

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    setTimeout(() => setPhase('store'), 2000);
  };

  const handlePurchaseComplete = (results) => {
    setPurchaseResults(results);
    setPhase('complete');
  };

  const startQuiz = () => {
    setPhase('quiz');
  };

  return (
    <div className="round1-page">
      {/* Background */}
      <div className="round1-bg"></div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="round1-header"
      >
        <div className="round-badge">ROUND 1</div>
        <h1 className="round1-title">Component Quest</h1>
        <p className="round1-subtitle">Earn. Buy. Build.</p>
      </motion.div>

      {/* Intro Phase */}
      {phase === 'intro' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="intro-section"
        >
          <div className="intro-card">
            <h2>Mission Briefing</h2>
            <div className="briefing-content">
              <div className="briefing-item">
                <span className="briefing-icon">💰</span>
                <div>
                  <h3>Starting Bonus</h3>
                  <p>You begin with ₹{BONUS_AMOUNT} in your account</p>
                </div>
              </div>

              <div className="briefing-item">
                <span className="briefing-icon">❓</span>
                <div>
                  <h3>Answer Questions</h3>
                  <p>12 questions • ₹100 per correct answer • 2 minutes each</p>
                </div>
              </div>

              <div className="briefing-item">
                <span className="briefing-icon">🛒</span>
                <div>
                  <h3>Purchase Components</h3>
                  <p>Buy exactly 6 components from the store using your funds</p>
                </div>
              </div>

              <div className="briefing-item">
                <span className="briefing-icon">⚠️</span>
                <div>
                  <h3>Important Warning</h3>
                  <p>If you drop a purchased component later, money will NOT be refunded!</p>
                </div>
              </div>

              <div className="briefing-item">
                <span className="briefing-icon">🎯</span>
                <div>
                  <h3>Scoring</h3>
                  <p>Your Round 1 score = Amount remaining after purchasing 6 components</p>
                </div>
              </div>
            </div>

            <button className="start-quiz-btn" onClick={startQuiz}>
              <span className="btn-glow"></span>
              Begin Component Quest
            </button>
          </div>
        </motion.div>
      )}

      {/* Quiz Phase */}
      {phase === 'quiz' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="quiz-section"
        >
          <QuizRunner questions={quizQuestions} onComplete={handleQuizComplete} />
        </motion.div>
      )}

      {/* Quiz Results Transition */}
      {phase === 'quiz' && quizResults && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="quiz-results-overlay"
        >
          <div className="results-card">
            <h2>Quiz Complete!</h2>
            <div className="results-stats">
              <div className="result-stat">
                <span className="stat-label">Correct Answers</span>
                <span className="stat-value">{quizResults.correctCount} / {quizResults.totalQuestions}</span>
              </div>
              <div className="result-stat">
                <span className="stat-label">Earned</span>
                <span className="stat-value earned">₹{quizResults.earnedAmount}</span>
              </div>
              <div className="result-stat">
                <span className="stat-label">Starting Bonus</span>
                <span className="stat-value">₹{BONUS_AMOUNT}</span>
              </div>
              <div className="result-stat total">
                <span className="stat-label">Total Balance</span>
                <span className="stat-value total">₹{quizResults.earnedAmount + BONUS_AMOUNT}</span>
              </div>
            </div>
            <p className="transition-text">Loading Component Store...</p>
          </div>
        </motion.div>
      )}

      {/* Store Phase */}
      {phase === 'store' && quizResults && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="store-section"
        >
          <div className="store-instructions">
            <h2>Component Store</h2>
            <p>Use your balance of <strong>₹{quizResults.earnedAmount + BONUS_AMOUNT}</strong> to purchase exactly 6 components.</p>
            <p className="warning-text">⚠️ Choose wisely! Essential components are marked.</p>
          </div>
          
          <ComponentStore
            components={componentStore}
            initialBalance={quizResults.earnedAmount + BONUS_AMOUNT}
            onPurchaseComplete={handlePurchaseComplete}
          />
        </motion.div>
      )}

      {/* Complete Phase */}
      {phase === 'complete' && purchaseResults && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="complete-section"
        >
          <div className="complete-card">
            <div className="success-icon">🎉</div>
            <h1>Round 1 Complete!</h1>
            
            <div className="final-summary">
              <h3>Your Performance</h3>
              
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Quiz Score</span>
                  <span className="summary-value">{quizResults.correctCount}/{quizResults.totalQuestions}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Earned from Quiz</span>
                  <span className="summary-value">₹{quizResults.earnedAmount}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Starting Bonus</span>
                  <span className="summary-value">₹{BONUS_AMOUNT}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Total Available</span>
                  <span className="summary-value">₹{quizResults.earnedAmount + BONUS_AMOUNT}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Total Spent</span>
                  <span className="summary-value">₹{purchaseResults.totalSpent}</span>
                </div>
                <div className="summary-item highlight">
                  <span className="summary-label">Round 1 Score</span>
                  <span className="summary-value glow">₹{purchaseResults.remainingBalance}</span>
                </div>
              </div>

              <div className="purchased-components-summary">
                <h4>Your Components for Round 2:</h4>
                <div className="component-chips">
                  {purchaseResults.components.map((comp) => (
                    <div key={comp.code} className="component-chip">
                      <span>{comp.icon}</span>
                      <span>{comp.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="proceed-btn" onClick={() => navigate('/round2')}>
                Proceed to Round 2: System Genesis →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Round1;
