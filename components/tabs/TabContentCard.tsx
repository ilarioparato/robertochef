"use client"

import React from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/cards/GlassCard";
import { TabId } from "@/components/tabs/TabId";

interface TabContentCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  activeTabId: TabId; // Usato per la chiave dell'animazione
  isDesktop?: boolean;
  minHeight?: string; // Nuovo prop per l'altezza minima
}

const TabContentCard: React.FC<TabContentCardProps> = ({ 
  title, 
  content, 
  icon, 
  activeTabId, 
  isDesktop,
  minHeight // Usiamo questo se fornito
}) => {
  return (
    <motion.div
      key={isDesktop ? `desktop-${activeTabId}` : `mobile-${activeTabId}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-[520px] mx-auto"
      style={{ minHeight: !isDesktop ? minHeight : undefined }} // Applica minHeight solo su mobile
    >
      <GlassCard className="w-full h-full p-6 md:p-8 backdrop-blur-md">
        <div className="flex items-center gap-3 md:gap-4 mb-6">
          {icon}
          <h3 className="text-2xl md:text-3xl font-black text-white truncate">
            {title}
          </h3>
        </div>
        <div className="text-base md:text-lg text-white/80 font-normal whitespace-pre-line">
          {content}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default TabContentCard;