import React, { useState } from 'react';

const Tooltip = ({ text, children, className = '' }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {show && (
        <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-gray-700 bg-white rounded-lg shadow-lg border border-gray-200 whitespace-nowrap">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-white"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
