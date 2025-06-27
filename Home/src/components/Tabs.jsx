// src/components/Tabs.jsx
import { useState } from 'react';

const tabs = ['Architect', 'FAS', 'Bioinformatics', 'Project Management'];

export default function Tabs({ onTabChange }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex space-x-4 mb-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === tab
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-blue-500'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
