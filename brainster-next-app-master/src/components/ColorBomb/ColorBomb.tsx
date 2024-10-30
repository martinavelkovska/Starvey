"use client";
import React, { useEffect } from 'react';
import { Fireworks } from '@fireworks-js/react';

const ColorBomb: React.FC = () => {
  useEffect(() => {
    const handleResize = () => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: '-10vh',       // Move up by 10% of the viewport height
        left: 0,
        zIndex: 1000,       // Increase zIndex to ensure it covers other content
        pointerEvents: 'none', // Make sure it doesn't block interactions
      }}
    >
      <Fireworks
        options={{
          autoresize: true,
          opacity: 0.7,
          acceleration: 0.9,
          friction: 0.97,
          gravity: 1.5,
          particles: 60,
          traceLength: 8,
          traceSpeed: 80,
          explosion: 7,
          intensity: 4,
          flickering: 60,
          lineStyle: 'round',
          hue: {
            min: 0,
            max: 360,
          },
          delay: {
            min: 15,
            max: 45,
          },
          rocketsPoint: {
            min: 0,
            max: 100,
          },
          lineWidth: {
            explosion: {
              min: 1,
              max: 3,
            },
            trace: {
              min: 1,
              max: 2,
            },
          },
          brightness: {
            min: 60,
            max: 100,
          },
          decay: {
            min: 0.015,
            max: 0.03,
          },
          mouse: {
            click: false,
            move: false,
            max: 1,
          },
        }}
      />
    </div>
  );
};

export default ColorBomb;
