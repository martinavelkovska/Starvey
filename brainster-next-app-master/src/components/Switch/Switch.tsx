"use client";
import React from "react";

interface ToggleButtonProps {
  enabled: boolean;
  onToggle: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ enabled, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`flex items-center cursor-pointer w-16 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out ${enabled ? 'bg-rose-300' : 'bg-zinc-500'}`}
    >
      <div
        className={`h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${enabled ? 'transform translate-x-8' : ''}`}
      />
    </div>
  );
};

export default ToggleButton;
