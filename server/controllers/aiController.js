import { generateSmartReplies, detectSpam, generateContextualResponse } from "../lib/gemini.js";
import Message from "../models/Message.js";

export const getSmartReplies = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    // Get recent conversation history (last 10 messages)
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('senderId', 'fullName');

    // Format messages for AI processing
    const conversationHistory = messages.reverse().map(msg => ({
      text: msg.text || '[Image]',
      isCurrentUser: msg.senderId._id.toString() === currentUserId.toString(),
      timestamp: msg.createdAt
    }));

    if (conversationHistory.length === 0) {
      return res.json({ 
        success: true, 
        suggestions: ["Hello! 👋", "How are you?", "What's up?"] 
      });
    }

    const suggestions = await generateSmartReplies(conversationHistory);
    
    res.json({ 
      success: true, 
      suggestions: suggestions.length > 0 ? suggestions : ["Thanks!", "Got it 👍", "Sounds good!"]
    });
  } catch (error) {
    console.error('Error getting smart replies:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const checkSpam = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.json({ success: false, message: "Invalid message" });
    }

    const spamResult = await detectSpam(message);
    
    res.json({ 
      success: true, 
      spamDetection: spamResult
    });
  } catch (error) {
    console.error('Error checking spam:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getContextualSuggestion = async (req, res) => {
  try {
    const { message } = req.body;
    const userProfile = req.user;

    const suggestion = await generateContextualResponse(message, userProfile);
    
    res.json({ 
      success: true, 
      suggestion: suggestion || "That's interesting!"
    });
  } catch (error) {
    console.error('Error getting contextual suggestion:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};