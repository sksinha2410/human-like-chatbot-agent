import { MongoClient, Db, Collection } from 'mongodb';
import { config } from '../config';
import { UserProfile, ChatSession } from '../types';

class DatabaseService {
  private client: MongoClient;
  private db: Db | null = null;
  private userProfilesCollection: Collection<UserProfile> | null = null;
  private chatSessionsCollection: Collection<ChatSession> | null = null;

  constructor() {
    this.client = new MongoClient(config.mongodb.uri);
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db();
      this.userProfilesCollection = this.db.collection<UserProfile>('userProfiles');
      this.chatSessionsCollection = this.db.collection<ChatSession>('chatSessions');
      
      // Create indexes for better performance
      await this.userProfilesCollection.createIndex({ userId: 1 }, { unique: true });
      await this.chatSessionsCollection.createIndex({ sessionId: 1 }, { unique: true });
      await this.chatSessionsCollection.createIndex({ userId: 1 });
      
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }

  getUserProfilesCollection(): Collection<UserProfile> {
    if (!this.userProfilesCollection) {
      throw new Error('Database not connected');
    }
    return this.userProfilesCollection;
  }

  getChatSessionsCollection(): Collection<ChatSession> {
    if (!this.chatSessionsCollection) {
      throw new Error('Database not connected');
    }
    return this.chatSessionsCollection;
  }
}

export const databaseService = new DatabaseService();
