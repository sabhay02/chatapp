import { useState } from 'react';
import axios from 'axios';

export const useAI = () => {
  const [smartReplies, setSmartReplies] = useState([]);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const [spamDetection, setSpamDetection] = useState(null);

  const getSmartReplies = async (userId) => {
    try {
      setIsLoadingReplies(true);
      const { data } = await axios.get(`/api/ai/smart-replies/${userId}`);
      if (data.success) {
        setSmartReplies(data.suggestions);
      }
    } catch (error) {
      console.error('Error fetching smart replies:', error);
      setSmartReplies([]);
    } finally {
      setIsLoadingReplies(false);
    }
  };

  const checkSpam = async (message) => {
    try {
      const { data } = await axios.post('/api/ai/check-spam', { message });
      if (data.success) {
        setSpamDetection(data.spamDetection);
        return data.spamDetection;
      }
    } catch (error) {
      console.error('Error checking spam:', error);
      return { isSpam: false, confidence: 0, reason: "" };
    }
  };

  const getContextualSuggestion = async (message) => {
    try {
      const { data } = await axios.post('/api/ai/contextual-suggestion', { message });
      if (data.success) {
        return data.suggestion;
      }
    } catch (error) {
      console.error('Error getting contextual suggestion:', error);
      return "";
    }
  };

  return {
    smartReplies,
    isLoadingReplies,
    spamDetection,
    getSmartReplies,
    checkSpam,
    getContextualSuggestion,
    setSmartReplies
  };
};