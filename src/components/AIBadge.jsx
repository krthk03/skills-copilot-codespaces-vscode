import React from 'react';

const AIBadge = ({ text = 'AI Verified', className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-1 text-xs text-blue-600 ${className}`}>
      <span className="text-sm">⚡</span>
      <span>{text}</span>
    </div>
  );
};

export default AIBadge;
