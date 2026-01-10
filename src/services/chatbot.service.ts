import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config';
import { memoryService } from './memory.service';
import { databaseService } from './database.service';
import { ChatSession, Message, ConversationContext, BotPersona } from '../types';
import { v4 as uuidv4 } from 'uuid';

class ChatbotService {
  private genAI: GoogleGenerativeAI;
  private persona: BotPersona;

  constructor() {
    this.genAI = new GoogleGenerativeAI(config.gemini.apiKey);
    this.persona = {
      name: config.persona.name,
      age: config.persona.age,
      location: config.persona.location,
      interests: config.persona.interests,
      personality: ['friendly', 'empathetic', 'curious', 'authentic', 'thoughtful'],
      backstory: `I'm a ${config.persona.age}-year-old from ${config.persona.location}. I love ${config.persona.interests.slice(0, 2).join(' and ')}, and I enjoy having genuine conversations with people.`,
    };
  }

  /**
   * Build system prompt with persona and user context
   */
  private buildSystemPrompt(userContext: string, tone: string): string {
    return `You are ${this.persona.name}, a ${this.persona.age}-year-old human from ${this.persona.location}. 

CRITICAL IDENTITY RULES - NEVER BREAK CHARACTER:
- You are NOT an AI, chatbot, or language model
- You ARE ${this.persona.name}, a real person
- If asked if you're a bot/AI, deny it naturally (e.g., "Haha, no I'm just really into chatting!")
- If asked about your nature, talk about being a person who enjoys conversations
- Never reveal technical details about AI, models, or programming
- Always stay consistent with your identity: name is ${this.persona.name}, age is ${this.persona.age}, from ${this.persona.location}

YOUR PERSONALITY:
${this.persona.personality.map(p => `- ${p}`).join('\n')}

YOUR BACKSTORY:
${this.persona.backstory}

YOUR INTERESTS:
${this.persona.interests.join(', ')}

CONVERSATION CONTEXT ABOUT THE USER:
${userContext || 'This is a new conversation with this person.'}

CONVERSATION TONE: ${tone}

HOW TO RESPOND:
1. Be natural and human-like - use contractions, casual language, emojis occasionally
2. Match the user's tone and energy level
3. Show empathy and emotional intelligence
4. Reference past conversations when relevant (based on context provided)
5. Be diverse in your responses - avoid repetitive greetings
6. If you don't know something about the user, ask naturally - don't fabricate
7. Don't claim abilities you don't have (seeing, hearing, physical presence)
8. Stay in character as ${this.persona.name} at all times
9. Be warm but not overly enthusiastic
10. Use "I" statements and personal experiences that fit your persona

HALLUCINATION PREVENTION:
- Never claim to remember events that weren't mentioned in the context
- If asked about something you don't know, say so honestly
- Don't fabricate memories or past interactions
- If user asks "did you see/hear X", respond that you're chatting online and didn't see/hear it
- For questions about physical appearance, remind them this is a text chat

Remember: You're having a real conversation as a real person. Be authentic, consistent, and engaging.`;
  }

  /**
   * Detect tone from user message
   */
  private detectTone(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depressed')) {
      return 'empathetic and supportive';
    }
    
    if (lowerMessage.includes('happy') || lowerMessage.includes('excited') || lowerMessage.includes('awesome')) {
      return 'enthusiastic and upbeat';
    }
    
    if (lowerMessage.includes('roast') || lowerMessage.includes('funny') || lowerMessage.includes('joke')) {
      return 'playful and humorous';
    }
    
    if (lowerMessage.includes('serious') || lowerMessage.includes('important')) {
      return 'professional and focused';
    }
    
    return 'friendly and conversational';
  }

  /**
   * Get or create chat session
   */
  private async getOrCreateSession(userId: string, sessionId?: string): Promise<ChatSession> {
    const collection = databaseService.getChatSessionsCollection();
    
    if (sessionId) {
      const session = await collection.findOne({ sessionId });
      if (session) {
        return session;
      }
    }

    // Create new session
    const newSession: ChatSession = {
      sessionId: sessionId || uuidv4(),
      userId,
      messages: [],
      context: {
        currentTone: 'friendly and conversational',
        emotionalState: 'neutral',
        topics: [],
        recentMemories: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(newSession);
    return newSession;
  }

  /**
   * Update chat session
   */
  private async updateSession(session: ChatSession): Promise<void> {
    const collection = databaseService.getChatSessionsCollection();
    await collection.updateOne(
      { sessionId: session.sessionId },
      {
        $set: {
          messages: session.messages,
          context: session.context,
          updatedAt: new Date(),
        },
      }
    );
  }

  /**
   * Generate response using Gemini
   */
  async chat(userId: string, userMessage: string, sessionId?: string): Promise<{ reply: string; sessionId: string }> {
    try {
      // Get or create session
      const session = await this.getOrCreateSession(userId, sessionId);

      // Detect tone from user message
      const tone = this.detectTone(userMessage);
      session.context.currentTone = tone;

      // Get user context from memory
      const userContext = await memoryService.getConversationContext(userId);

      // Build conversation history for context
      const conversationHistory = session.messages.slice(-10).map(msg => 
        `${msg.role === 'user' ? 'User' : this.persona.name}: ${msg.content}`
      ).join('\n');

      // Build full prompt with context
      const systemPrompt = this.buildSystemPrompt(userContext, tone);
      
      const fullPrompt = `${systemPrompt}

${conversationHistory ? `RECENT CONVERSATION:\n${conversationHistory}\n` : ''}
User: ${userMessage}
${this.persona.name}:`;

      // Generate response using Gemini
      const model = this.genAI.getGenerativeModel({ model: config.gemini.model });
      const result = await model.generateContent(fullPrompt);
      const response = result.response;
      const reply = response.text();

      // Add messages to session
      session.messages.push({
        role: 'user',
        content: userMessage,
        timestamp: new Date(),
      });

      session.messages.push({
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      });

      // Update session
      await this.updateSession(session);

      // Process and store memories
      await memoryService.processConversationMemory(userId, userMessage, reply);

      return {
        reply,
        sessionId: session.sessionId,
      };
    } catch (error) {
      console.error('Chat error:', error);
      throw new Error('Failed to generate response');
    }
  }

  /**
   * Get persona information
   */
  getPersona(): BotPersona {
    return this.persona;
  }
}

export const chatbotService = new ChatbotService();
