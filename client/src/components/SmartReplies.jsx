import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

const SmartReplies = ({ suggestions, isLoading, onSelectReply, onRefresh }) => {
  if (!suggestions.length && !isLoading) return null;

  return (
    <div className="p-3 border-t border-gray-600/30 bg-gray-900/20 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-gray-300 font-medium">Smart Replies</span>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-1 hover:bg-gray-700/30 rounded transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-3 h-3 text-gray-400 animate-spin" />
          ) : (
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {isLoading ? (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Loader2 className="w-3 h-3 animate-spin" />
            Generating suggestions...
          </div>
        ) : (
          suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSelectReply(suggestion)}
              className="
                px-3 py-1.5 text-xs
                bg-gradient-to-r from-purple-600/20 to-blue-600/20
                border border-purple-500/30
                rounded-full text-white
                hover:from-purple-600/30 hover:to-blue-600/30
                hover:border-purple-400/50
                transition-all duration-200
                backdrop-blur-sm
              "
            >
              {suggestion}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default SmartReplies;