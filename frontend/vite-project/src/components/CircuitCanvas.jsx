import { useEffect, useRef } from 'react';

/**
 * CircuitCanvas - Animated holographic circuit background
 * Renders flowing energy lines and floating particles
 */
const CircuitCanvas = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setCanvasSize();

    // Circuit lines data
    const lines = [];
    const lineCount = 8;
    
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x1: Math.random() * width,
        y1: Math.random() * height,
        x2: Math.random() * width,
        y2: Math.random() * height,
        offset: Math.random() * 100,
        speed: 0.3 + Math.random() * 0.5,
        opacity: 0.2 + Math.random() * 0.3,
      });
    }

    // Floating particles
    const particles = [];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 3,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: 0.3 + Math.random() * 0.4,
        color: Math.random() > 0.5 ? '#00FFFF' : '#7B61FF',
      });
    }

    // Animation loop
    let frame = 0;
    const animate = () => {
      ctx.fillStyle = 'rgba(5, 11, 20, 0.1)';
      ctx.fillRect(0, 0, width, height);

      frame++;

      // Draw circuit lines with energy pulses
      lines.forEach((line) => {
        const gradient = ctx.createLinearGradient(line.x1, line.y1, line.x2, line.y2);
        
        const pulse = Math.sin((frame * line.speed + line.offset) * 0.05) * 0.5 + 0.5;
        
        gradient.addColorStop(0, `rgba(0, 230, 255, 0)`);
        gradient.addColorStop(pulse * 0.3, `rgba(0, 230, 255, ${line.opacity * 0.2})`);
        gradient.addColorStop(pulse * 0.5, `rgba(0, 255, 255, ${line.opacity * pulse})`);
        gradient.addColorStop(pulse * 0.7, `rgba(123, 97, 255, ${line.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(123, 97, 255, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00E6FF';
        
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
        
        ctx.shadowBlur = 0;
      });

      // Draw floating particles
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Pulsing opacity
        const particlePulse = Math.sin(frame * 0.03 + particle.x) * 0.2 + 0.8;

        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = particle.color;
        ctx.globalAlpha = particle.opacity * particlePulse;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
      // Reposition lines
      lines.forEach(line => {
        line.x1 = Math.random() * width;
        line.y1 = Math.random() * height;
        line.x2 = Math.random() * width;
        line.y2 = Math.random() * height;
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default CircuitCanvas;
