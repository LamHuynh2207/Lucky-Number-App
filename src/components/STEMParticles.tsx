import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  letter: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export function STEMParticles({ isActive }: { isActive: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (isActive) {
      const letters = ['S', 'T', 'E', 'M'];
      const newParticles: Particle[] = [];
      
      // Reduced from 12 to 6 particles for better performance
      for (let i = 0; i < 6; i++) {
        newParticles.push({
          id: i,
          letter: letters[i % 4],
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 0.5,
          duration: 2 + Math.random() * 1.5,
        });
      }
      
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-4xl"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            color: '#00ffff',
            textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1.5, 0],
            rotate: [0, 180, 360],
            x: [0, (Math.random() - 0.5) * 200],
            y: [0, (Math.random() - 0.5) * 200],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          {particle.letter}
        </motion.div>
      ))}
    </div>
  );
}