import React from 'react';

const SmartSummaryBox = ({ title, items, confidence, className = '' }) => {
  return (
    <div className={`bg-check24-light-blue border border-blue-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">⚡</span>
        <h3 className="font-semibold text-check24-blue">{title}</h3>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            <span>{item.icon}</span>
            <span className="text-gray-700">{item.text}</span>
          </div>
        ))}
      </div>
      {confidence && (
        <div className="mt-3 pt-3 border-t border-blue-200">
          <p className="text-sm text-check24-blue font-medium">
            Confidence: {confidence}%
          </p>
        </div>
      )}
    </div>
  );
};

export default SmartSummaryBox;
