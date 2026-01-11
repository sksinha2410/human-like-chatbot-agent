import { MongoClient, Db, Collection } from 'mongodb';
import { config } from '../config';
import { UserProfile, ChatSession } from '../types';

/**
 * MongoDB database service - stores data in MongoDB
 */
class DatabaseService {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private isConnected: boolean = false;

  constructor() {
    // MongoDB client will be initialized on connect
  }

  async connect(): Promise<void> {
    try {
      const mongoUri = config.mongodb.uri;
      
      // Create MongoDB client
      this.client = new MongoClient(mongoUri);
      
      // Connect to MongoDB
      await this.client.connect();
      
      // Get database instance
      this.db = this.client.db(config.mongodb.dbName);
      
      this.isConnected = true;
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.isConnected = false;
      console.log('MongoDB disconnected');
    }
  }

  getUserProfilesCollection(): Collection<UserProfile> {
    if (!this.isConnected || !this.db) {
      throw new Error('Database not connected');
    }
    return this.db.collection<UserProfile>('userProfiles');
  }

  getChatSessionsCollection(): Collection<ChatSession> {
    if (!this.isConnected || !this.db) {
      throw new Error('Database not connected');
    }
    return this.db.collection<ChatSession>('chatSessions');
  }
}

export const databaseService = new DatabaseService();
