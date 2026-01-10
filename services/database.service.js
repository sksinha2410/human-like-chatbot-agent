"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseService = void 0;
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
class DatabaseService {
    constructor() {
        this.db = null;
        this.userProfilesCollection = null;
        this.chatSessionsCollection = null;
        this.client = new mongodb_1.MongoClient(config_1.config.mongodb.uri);
    }
    async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db();
            this.userProfilesCollection = this.db.collection('userProfiles');
            this.chatSessionsCollection = this.db.collection('chatSessions');
            // Create indexes for better performance
            await this.userProfilesCollection.createIndex({ userId: 1 }, { unique: true });
            await this.chatSessionsCollection.createIndex({ sessionId: 1 }, { unique: true });
            await this.chatSessionsCollection.createIndex({ userId: 1 });
            console.log('Connected to MongoDB successfully');
        }
        catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
    }
    async disconnect() {
        await this.client.close();
    }
    getUserProfilesCollection() {
        if (!this.userProfilesCollection) {
            throw new Error('Database not connected');
        }
        return this.userProfilesCollection;
    }
    getChatSessionsCollection() {
        if (!this.chatSessionsCollection) {
            throw new Error('Database not connected');
        }
        return this.chatSessionsCollection;
    }
}
exports.databaseService = new DatabaseService();
//# sourceMappingURL=database.service.js.map