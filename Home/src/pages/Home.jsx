// src/pages/Home.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoleSidebar from '../components/roleSidebar';
import ToolsSection from '../components/ToolsSections';
import FormsSections from '../components/FormsSections'; // Import FormsSections component

export default function Home() {
  const [activeTab, setActiveTab] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Tools'); // tracker for sidebar menu selection
  const [direction, setDirection] = useState('forward'); // track navigation direction

  const handleActiveTab = (role) => {
    setDirection('forward');
    setActiveTab(role);
  };

  const handleBackToHome = () => {
    setDirection('backward');
    setActiveTab(null);
    setSelectedMenuItem('Tools'); // reset menu selection too
  };

  const variants = {
    forward: {
      initial: { x: '100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '-100%', opacity: 0 }
    },
    backward: {
      initial: { x: '-100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '100%', opacity: 0 }
    }
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {!activeTab && (
          <motion.div
            key="role-select"
            initial={variants.backward.initial}
            animate={variants.backward.animate}
            exit={variants.forward.exit}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-screen space-y-4"
          >
            <h2 className="text-xl font-bold">Select Your Role</h2>
            <div className="flex gap-4">
              {['Architect', 'FAS', 'Bioinformatics', 'Project Management'].map((role) => (
                <button
                  key={role}
                  onClick={() => handleActiveTab(role)}
                  className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700"
                >
                  {role}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab && (
          <motion.div
            key="dashboard"
            initial={variants.forward.initial}
            animate={variants.forward.animate}
            exit={variants.backward.exit}
            transition={{ duration: 0.25 }}
          >
            <div className="flex justify-end p-4">
              <button
                onClick={handleBackToHome}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium">
                Home
              </button>
            </div>
            <div className="flex gap-6 p-4">
              <RoleSidebar role={activeTab} onSelect={setSelectedMenuItem} />
              <div className="flex-1">
                {selectedMenuItem === 'Tools' && (
                  <ToolsSection activeRole={activeTab} />
                )}
                {selectedMenuItem === 'Forms' && (
                  <FormsSections activeRole={activeTab} />
                )}
                {/* You can add Forms, Resources, Update below */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
