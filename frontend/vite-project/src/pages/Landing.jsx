import { useNavigate } from 'react-router-dom';
import CircuitCanvas from '../components/CircuitCanvas';
import Hero from '../components/Hero';
import PhaseCards from '../components/PhaseCards';
import Footer from '../components/Footer';
import './Landing.css';

/**
 * Landing - Main landing page combining all Neurovia themed components
 */
const Landing = () => {
  const navigate = useNavigate();

  const handleEnterSimulation = () => {
    // Check if team is registered
    const teamId = localStorage.getItem('teamId');
    if (teamId) {
      navigate('/round1');
    } else {
      // Redirect to registration if not registered
      navigate('/register');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="landing-page">
      {/* Animated Circuit Background */}
      <CircuitCanvas />

      {/* Hero Section */}
      <Hero onEnterSimulation={handleEnterSimulation} onRegister={handleRegister} />

      {/* Event Phases */}
      <PhaseCards />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
