import { Collection } from 'mongodb';
import { UserProfile, ChatSession } from '../types';
declare class DatabaseService {
    private client;
    private db;
    private userProfilesCollection;
    private chatSessionsCollection;
    constructor();
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getUserProfilesCollection(): Collection<UserProfile>;
    getChatSessionsCollection(): Collection<ChatSession>;
}
export declare const databaseService: DatabaseService;
export {};
//# sourceMappingURL=database.service.d.ts.map