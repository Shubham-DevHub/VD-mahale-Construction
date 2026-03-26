import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiDroplet, FiZap, FiTruck, FiMapPin } from 'react-icons/fi';
import SectionHeader from '../common/SectionHeader';
import { infrastructureData } from '../../data/infrastructureData';
import './InfrastructureSection.css';

const InfrastructureSection = () => {
  const [activeTab, setActiveTab] = useState('rmc');

  const tabs = [
    { id: 'rmc', label: 'RMC Plants', icon: <FiDroplet />, data: infrastructureData.rmcPlants },
    { id: 'hotmix', label: 'Hotmix Plants', icon: <FiZap />, data: infrastructureData.hotmixPlants },
    { id: 'crusher', label: 'Stone Crushers', icon: <FiSettings />, data: infrastructureData.stoneCrushers },
    { id: 'fleet', label: 'Active Fleet', icon: <FiTruck />, data: infrastructureData.fleet }
  ];

  return (
    <section className="infra-section bg-dark">
      <div className="container">
        <SectionHeader 
          light
          label="Our Assets"
          title="Robust Infrastructure Backbone"
          subtitle="Equipped with high-capacity production units and a modern fleet to ensure self-reliance and quality control."
        />

        <div className="infra-tabs-container">
          <div className="infra-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`infra-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="infra-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="infra-grid"
              >
                {activeTab === 'fleet' ? (
                  infrastructureData.fleet.map((item, idx) => (
                    <div key={idx} className="fleet-item">
                      <div className="fleet-count">{item.count}</div>
                      <div className="fleet-info">
                        <h4>{item.type}</h4>
                        <p>{item.models}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  tabs.find(t => t.id === activeTab).data.map((item) => (
                    <div key={item.id} className="plant-card-mini">
                      <div className="plant-status">● {item.status}</div>
                      <h3>{item.name}</h3>
                      <p className="plant-loc">
                        <FiMapPin className="text-orange" /> {item.location}
                      </p>
                      <div className="plant-cap">
                        <span>Capacity:</span>
                        <strong>{item.capacity}</strong>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
