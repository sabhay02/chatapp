import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize the model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const generateSmartReplies = async (conversationHistory) => {
  try {
    const prompt = `
Based on the following conversation history, suggest 3 short, contextually appropriate reply options (each under 50 characters). 
Make them natural, helpful, and varied in tone (casual, professional, friendly).

Conversation:
${conversationHistory.map(msg => `${msg.isCurrentUser ? 'You' : 'Friend'}: ${msg.text}`).join('\n')}

Provide only the 3 reply suggestions, one per line, without numbering or formatting.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Split the response into individual suggestions and clean them
    const suggestions = text
      .split('\n')
      .filter(line => line.trim())
      .slice(0, 3)
      .map(suggestion => suggestion.trim().replace(/^[\d\-\*\•]\s*/, ''));

    return suggestions;
  } catch (error) {
    console.error('Error generating smart replies:', error);
    return [];
  }
};

export const detectSpam = async (message) => {
  try {
    const prompt = `
Analyze this message for spam characteristics. Consider:
- Excessive promotional content
- Suspicious links or requests for personal info
- Repetitive or nonsensical text
- Scam indicators

Message: "${message}"

Respond with only a JSON object:
{
  "isSpam": boolean,
  "confidence": number (0-1),
  "reason": "brief explanation if spam"
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return { isSpam: false, confidence: 0, reason: "" };
  } catch (error) {
    console.error('Error detecting spam:', error);
    return { isSpam: false, confidence: 0, reason: "" };
  }
};

export const generateContextualResponse = async (message, userProfile) => {
  try {
    const prompt = `
Generate a helpful, contextual response to this message. Consider the user's profile and message context.

User Profile: ${userProfile?.bio || 'No bio available'}
Message: "${message}"

Provide a natural, helpful response (under 100 characters) that would be appropriate for this conversation.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error generating contextual response:', error);
    return "";
  }
};