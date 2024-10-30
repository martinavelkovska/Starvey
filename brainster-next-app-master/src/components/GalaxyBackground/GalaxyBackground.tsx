"use client";
import React from "react";
import Particles from "react-tsparticles"; // Ensure correct import
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const GalaxyBackground = () => {
  return (
    <Particles
    options={{
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      particles: {
        number: {
          value: 100, // Number of particles
          density: {
            enable: true,
            value_area: 800, // Density area
          },
        },
        color: {
          value: "#ffffff", // Particle color
        },
        shape: {
          type: "circle", // Shape of particles
        },
        opacity: {
          value: 0.5, // Opacity of particles
          random: true, // Random opacity
        },
        size: {
          value: 3, // Size of particles
          random: true, // Random size
        },
        move: {
          enable: true,
          speed: 2, // Speed of particles
          direction: "none", // Direction of movement
          random: false,
          straight: false,
          out_mode: "out", // How particles behave when out of bounds
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse", // Interaction mode on hover
          },
          onClick: {
            enable: true,
            mode: "push", // Interaction mode on click
          },
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1, // Opacity of lines when grabbing
            },
          },
          repulse: {
            distance: 200, // Repulsion distance
          },
          push: {
            particles_nb: 4, // Number of particles to add on click
          },
        },
      },
      retina_detect: true, // Detect retina display
    }}
  />
  );
};

export default GalaxyBackground;
