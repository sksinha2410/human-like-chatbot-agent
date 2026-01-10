export interface UserProfile {
  userId: string;
  name?: string;
  preferences: Record<string, any>;
  interests: string[];
  conversationHistory: ConversationSummary[];
  personalDetails: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationSummary {
  timestamp: Date;
  topics: string[];
  sentiment: string;
  keyPoints: string[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  sessionId: string;
  userId: string;
  messages: Message[];
  context: ConversationContext;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationContext {
  currentTone: string;
  emotionalState: string;
  topics: string[];
  recentMemories: string[];
}

export interface ChatRequest {
  userId: string;
  message: string;
  sessionId?: string;
}

export interface ChatResponse {
  reply: string;
  sessionId: string;
  timestamp: Date;
}

export interface BotPersona {
  name: string;
  age: number;
  location: string;
  interests: string[];
  personality: string[];
  backstory: string;
}
