import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const SpamWarning = ({ spamDetection, onDismiss, onSendAnyway }) => {
  if (!spamDetection?.isSpam) return null;

  return (
    <div className="p-2 sm:p-3 bg-red-900/20 border border-red-500/30 rounded-lg mx-2 sm:mx-3 mb-2 sm:mb-3 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        
        <div className="flex-1">
          <h4 className="text-xs sm:text-sm font-medium text-red-300 mb-1">
            Potential Spam Detected
          </h4>
          <p className="text-xs text-red-200 mb-2">
            {spamDetection.reason || "This message may contain spam content."}
          </p>
          <p className="text-xs text-red-300">
            Confidence: {Math.round(spamDetection.confidence * 100)}%
          </p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={onSendAnyway}
              className="px-2 sm:px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
            >
              Send Anyway
            </button>
            <button
              onClick={onDismiss}
              className="px-2 sm:px-3 py-1 text-xs bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
        
        <button
          onClick={onDismiss}
          className="p-1 hover:bg-red-800/30 rounded transition-colors"
        >
          <X className="w-4 h-4 text-red-400" />
        </button>
      </div>
    </div>
  );
};

export default SpamWarning;