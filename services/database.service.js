"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseService = void 0;
/**
 * In-memory database service - stores data in memory without external database
 */
class DatabaseService {
    constructor() {
        this.userProfiles = new Map();
        this.chatSessions = new Map();
        this.isConnected = false;
        // Initialize in-memory storage
    }
    async connect() {
        // No external connection needed for in-memory storage
        this.isConnected = true;
        console.log('In-memory database initialized successfully');
    }
    async disconnect() {
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
            findOne: async (query) => {
                return this.userProfiles.get(query.userId) || null;
            },
            insertOne: async (profile) => {
                this.userProfiles.set(profile.userId, profile);
            },
            updateOne: async (query, update) => {
                const profile = this.userProfiles.get(query.userId);
                if (profile) {
                    if (update.$set) {
                        Object.assign(profile, update.$set);
                    }
                    if (update.$push) {
                        Object.entries(update.$push).forEach(([key, value]) => {
                            if (Array.isArray(profile[key])) {
                                profile[key].push(value);
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
            findOne: async (query) => {
                return this.chatSessions.get(query.sessionId) || null;
            },
            insertOne: async (session) => {
                this.chatSessions.set(session.sessionId, session);
            },
            updateOne: async (query, update) => {
                const session = this.chatSessions.get(query.sessionId);
                if (session && update.$set) {
                    Object.assign(session, update.$set);
                    this.chatSessions.set(query.sessionId, session);
                }
            },
        };
    }
}
exports.databaseService = new DatabaseService();
//# sourceMappingURL=database.service.js.map