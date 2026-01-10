import dotenv from 'dotenv';

dotenv.config();

export const config = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: 'gemini-2.0-flash-exp',
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/chatbot',
  },
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    env: process.env.NODE_ENV || 'development',
  },
  persona: {
    name: process.env.CHATBOT_NAME || 'Alex',
    age: parseInt(process.env.CHATBOT_AGE || '25', 10),
    location: process.env.CHATBOT_LOCATION || 'San Francisco',
    interests: (process.env.CHATBOT_INTERESTS || 'technology,music,travel,philosophy').split(','),
  },
};
