import { UserProfile, ChatSession } from '../types';

/**
 * In-memory database service - stores data in memory without external database
 */
class DatabaseService {
  private userProfiles: Map<string, UserProfile> = new Map();
  private chatSessions: Map<string, ChatSession> = new Map();
  private isConnected: boolean = false;

  constructor() {
    // Initialize in-memory storage
  }

  async connect(): Promise<void> {
    try {
      // No external connection needed for in-memory storage
      this.isConnected = true;
      console.log('In-memory database initialized successfully');
    } catch (error) {
      console.error('Database initialization error:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    // Clear in-memory data on disconnect
    this.userProfiles.clear();
    this.chatSessions.clear();
    this.isConnected = false;
    console.log('In-memory database cleared');
  }

  getUserProfilesCollection() {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }
    return {
      findOne: async (query: { userId: string }): Promise<UserProfile | null> => {
        return this.userProfiles.get(query.userId) || null;
      },
      insertOne: async (profile: UserProfile): Promise<void> => {
        this.userProfiles.set(profile.userId, profile);
      },
      updateOne: async (
        query: { userId: string },
        update: { $set?: Partial<UserProfile>; $push?: any }
      ): Promise<void> => {
        const profile = this.userProfiles.get(query.userId);
        if (profile) {
          if (update.$set) {
            Object.assign(profile, update.$set);
          }
          if (update.$push) {
            Object.entries(update.$push).forEach(([key, value]) => {
              if (Array.isArray(profile[key as keyof UserProfile])) {
                (profile[key as keyof UserProfile] as any[]).push(value);
              }
            });
          }
          this.userProfiles.set(query.userId, profile);
        }
      },
    };
  }

  getChatSessionsCollection() {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }
    return {
      findOne: async (query: { sessionId: string }): Promise<ChatSession | null> => {
        return this.chatSessions.get(query.sessionId) || null;
      },
      insertOne: async (session: ChatSession): Promise<void> => {
        this.chatSessions.set(session.sessionId, session);
      },
      updateOne: async (
        query: { sessionId: string },
        update: { $set?: Partial<ChatSession> }
      ): Promise<void> => {
        const session = this.chatSessions.get(query.sessionId);
        if (session && update.$set) {
          Object.assign(session, update.$set);
          this.chatSessions.set(query.sessionId, session);
        }
      },
    };
  }
}

export const databaseService = new DatabaseService();
