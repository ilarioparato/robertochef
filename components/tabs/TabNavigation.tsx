"use client"

import React from "react";
import TabButton from "./TabButton";
import { TabId } from "./TabId";

interface TabNavigationProps {
  tabs: { id: TabId; label: string; icon: React.ReactNode }[];
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
  isDesktop?: boolean;
  isExtraSmall?: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange, isDesktop = false, isExtraSmall = false }) => {
  const desktopContainerClasses = "flex justify-center space-x-8 md:space-x-12 lg:space-x-16";
  const mobileContainerClasses = `flex ${isExtraSmall ? 'justify-center space-x-10' : 'justify-between'}`;

  return (
    <div className={`relative ${isDesktop ? 'mb-6 md:mb-8 mt-6 md:mt-8' : 'z-20 mb-4 mt-0'}`}>
      <div className={isDesktop ? desktopContainerClasses : mobileContainerClasses}>
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            id={tab.id}
            isActive={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
            icon={tab.icon}
            label={tab.label}
            isDesktop={isDesktop}
            hideLabel={!isDesktop && isExtraSmall}
          />
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;