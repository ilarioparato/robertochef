"use client"

import React from "react";
import { motion } from "framer-motion";
import { TabId } from "./TabId";

interface TabButtonProps {
  id: TabId;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  isDesktop?: boolean;
  hideLabel?: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, icon, label, isDesktop = false, hideLabel = false }) => {
  return (
    <button
      className={`relative flex items-center gap-1.5 pb-2 ${
        isActive ? 'text-white' : 'text-white/60'
      } font-medium transition-colors duration-300`}
      onClick={onClick}
    >
      {icon}
      {!hideLabel && (
        <span className="text-sm md:text-base lg:text-lg whitespace-nowrap truncate">
          {label}
        </span>
      )}
      {isActive && (
        <motion.div
          className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-white rounded-full"
          layoutId={isDesktop ? "underline-desktop" : "underline-mobile"}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{
            boxShadow: "0 0 5px 1px rgba(255, 255, 255, 0.7)",
          }}
        />
      )}
    </button>
  );
};

export default TabButton;