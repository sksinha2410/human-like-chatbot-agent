import { UserProfile, ConversationSummary } from '../types';
declare class MemoryService {
    /**
     * Get or create a user profile
     */
    getUserProfile(userId: string): Promise<UserProfile>;
    /**
     * Update user profile with new information
     */
    updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void>;
    /**
     * Extract and store key information from conversation
     */
    processConversationMemory(userId: string, userMessage: string, botResponse: string): Promise<void>;
    /**
     * Extract and store various personal details
     */
    private extractAndStoreDetails;
    /**
     * Add conversation summary to user's history
     */
    addConversationSummary(userId: string, summary: ConversationSummary): Promise<void>;
    /**
     * Get user's conversation history context
     */
    getConversationContext(userId: string): Promise<string>;
}
export declare const memoryService: MemoryService;
export {};
//# sourceMappingURL=memory.service.d.ts.map