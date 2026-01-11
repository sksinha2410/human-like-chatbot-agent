import dotenv from 'dotenv';

dotenv.config();

// Validate required environment variables
const validateConfig = () => {
  const errors: string[] = [];

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '') {
    errors.push('GEMINI_API_KEY is required but not set in environment variables');
  }

  if (!process.env.MONGODB_URI || process.env.MONGODB_URI.trim() === '') {
    errors.push('MONGODB_URI is required but not set in environment variables');
  }

  if (errors.length > 0) {
    console.error('\n❌ Configuration Error:\n');
    errors.forEach(error => console.error(`  - ${error}`));
    console.error('\nPlease set the required environment variables in your .env file or deployment configuration.');
    console.error('See .env.example for reference.\n');
    throw new Error('Missing required configuration');
  }
};

// Validate configuration on module load
validateConfig();

export const config = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY!,
    model: 'gemini-2.0-flash-exp',
  },
  mongodb: {
    uri: process.env.MONGODB_URI!,
    dbName: process.env.MONGODB_DB_NAME || 'chatbot',
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
