/**
 * Node.js Backend Integration Example
 * 
 * This example shows how to integrate the chatbot into a Node.js backend
 * for server-to-server communication.
 */

const axios = require('axios');

const API_URL = process.env.CHATBOT_API_URL || 'http://localhost:3000';

class ChatbotClient {
  constructor(apiUrl = API_URL) {
    this.apiUrl = apiUrl;
  }

  /**
   * Send a message to the chatbot
   * @param {string} userId - Unique user identifier
   * @param {string} message - User message
   * @param {string} sessionId - Optional session ID
   * @returns {Promise<Object>} Chat response
   */
  async chat(userId, message, sessionId = null) {
    try {
      const response = await axios.post(`${this.apiUrl}/api/chat`, {
        userId,
        message,
        sessionId,
      });

      return {
        success: true,
        reply: response.data.reply,
        sessionId: response.data.sessionId,
        timestamp: response.data.timestamp,
      };
    } catch (error) {
      console.error('Chatbot error:', error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get chatbot persona information
   * @returns {Promise<Object>} Persona details
   */
  async getPersona() {
    try {
      const response = await axios.get(`${this.apiUrl}/api/persona`);
      return response.data;
    } catch (error) {
      console.error('Get persona error:', error.message);
      return null;
    }
  }

  /**
   * Check chatbot health
   * @returns {Promise<boolean>} Health status
   */
  async healthCheck() {
    try {
      const response = await axios.get(`${this.apiUrl}/api/health`);
      return response.data.status === 'healthy';
    } catch (error) {
      console.error('Health check error:', error.message);
      return false;
    }
  }
}

// Example usage
async function main() {
  const chatbot = new ChatbotClient();

  // Check health
  const isHealthy = await chatbot.healthCheck();
  console.log('Chatbot healthy:', isHealthy);

  if (!isHealthy) {
    console.error('Chatbot is not healthy');
    return;
  }

  // Get persona
  const persona = await chatbot.getPersona();
  console.log('Chatbot persona:', persona);

  // Start a conversation
  const userId = 'backend-user-123';
  let sessionId = null;

  // First message
  let response = await chatbot.chat(userId, 'Hi! My name is John');
  console.log('Bot:', response.reply);
  sessionId = response.sessionId;

  // Second message (with session ID to maintain context)
  response = await chatbot.chat(userId, 'I love programming', sessionId);
  console.log('Bot:', response.reply);

  // Test memory
  response = await chatbot.chat(userId, 'What is my name?', sessionId);
  console.log('Bot:', response.reply);
}

// Export for use in other modules
module.exports = ChatbotClient;

// Run example if executed directly
if (require.main === module) {
  main().catch(console.error);
}
