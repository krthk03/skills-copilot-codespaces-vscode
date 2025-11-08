import React from 'react';

const InfoBanner = ({ title, message, actionText, onAction, onDismiss, type = 'info' }) => {
  const bgColor = type === 'ai' ? 'bg-check24-light-blue' : 'bg-blue-50';
  const textColor = type === 'ai' ? 'text-check24-blue' : 'text-blue-900';

  return (
    <div className={`${bgColor} ${textColor} p-4 rounded-lg mb-4 flex items-center justify-between`}>
      <div className="flex items-center gap-2 flex-1">
        <span className="text-xl">⚡</span>
        <div>
          <p className="font-semibold">{title}</p>
          {message && <p className="text-sm mt-1">{message}</p>}
        </div>
      </div>
      <div className="flex gap-2">
        {actionText && (
          <button
            onClick={onAction}
            className="px-4 py-2 bg-check24-blue text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            {actionText}
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="px-4 py-2 border border-check24-blue text-check24-blue rounded-lg hover:bg-white transition-colors"
          >
            Edit Manually
          </button>
        )}
      </div>
    </div>
  );
};

export default InfoBanner;
