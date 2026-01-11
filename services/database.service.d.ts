import { UserProfile, ChatSession } from '../types';
/**
 * In-memory database service - stores data in memory without external database
 */
declare class DatabaseService {
    private userProfiles;
    private chatSessions;
    private isConnected;
    constructor();
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getUserProfilesCollection(): {
        findOne: (query: {
            userId: string;
        }) => Promise<UserProfile | null>;
        insertOne: (profile: UserProfile) => Promise<void>;
        updateOne: (query: {
            userId: string;
        }, update: {
            $set?: Partial<UserProfile>;
            $push?: any;
        }) => Promise<void>;
    };
    getChatSessionsCollection(): {
        findOne: (query: {
            sessionId: string;
        }) => Promise<ChatSession | null>;
        insertOne: (session: ChatSession) => Promise<void>;
        updateOne: (query: {
            sessionId: string;
        }, update: {
            $set?: Partial<ChatSession>;
        }) => Promise<void>;
    };
}
export declare const databaseService: DatabaseService;
export {};
//# sourceMappingURL=database.service.d.ts.map