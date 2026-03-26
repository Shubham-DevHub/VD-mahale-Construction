import React from 'react';
import { motion } from 'framer-motion';
import './Skeleton.css';

const Skeleton = ({ width, height, borderRadius = '8px', className = '' }) => {
  return (
    <div 
      className={`skeleton-base ${className}`}
      style={{ width, height, borderRadius }}
    >
      <div className="skeleton-shimmer"></div>
    </div>
  );
};

export const CardSkeleton = () => (
  <div className="p-6 border-white/5 space-y-4 bg-navy-900/50 border rounded-2xl">
    <Skeleton height="200px" width="100%" />
    <Skeleton height="24px" width="70%" />
    <Skeleton height="16px" width="40%" />
    <div className="flex gap-2">
      <Skeleton height="12px" width="20%" />
      <Skeleton height="12px" width="20%" />
    </div>
  </div>
);

export default Skeleton;
