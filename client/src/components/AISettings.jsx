import React, { useState } from 'react';
import { Settings, Sparkles, Shield, Brain } from 'lucide-react';

const AISettings = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    smartRepliesEnabled: true,
    spamDetectionEnabled: true,
    spamSensitivity: 0.7,
    autoSuggestEnabled: true
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    // Save to localStorage or send to backend
    localStorage.setItem('aiSettings', JSON.stringify({ ...settings, [key]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-900 border border-gray-600 rounded-lg w-[95%] sm:w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-600">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              AI Features
            </h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          {/* Smart Replies */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-sm font-medium text-white">Smart Replies</p>
                <p className="text-xs text-gray-400 hidden sm:block">AI-generated response suggestions</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.smartRepliesEnabled}
                onChange={(e) => handleSettingChange('smartRepliesEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Spam Detection */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <Shield className="w-4 h-4 text-red-400" />
              <div>
                <p className="text-sm font-medium text-white">Spam Detection</p>
                <p className="text-xs text-gray-400 hidden sm:block">Automatically detect spam messages</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.spamDetectionEnabled}
                onChange={(e) => handleSettingChange('spamDetectionEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          {/* Spam Sensitivity */}
          {settings.spamDetectionEnabled && (
            <div className="ml-5 sm:ml-7 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Sensitivity</span>
                <span className="text-xs text-white">{Math.round(settings.spamSensitivity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="0.9"
                step="0.1"
                value={settings.spamSensitivity}
                onChange={(e) => handleSettingChange('spamSensitivity', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          )}

          {/* Auto Suggestions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <Settings className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-sm font-medium text-white">Auto Suggestions</p>
                <p className="text-xs text-gray-400 hidden sm:block">Show suggestions while typing</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoSuggestEnabled}
                onChange={(e) => handleSettingChange('autoSuggestEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div className="p-3 sm:p-4 border-t border-gray-600">
          <button
            onClick={onClose}
            className="w-full py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 text-sm sm:text-base font-medium"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISettings;