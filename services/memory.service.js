"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoryService = void 0;
const database_service_1 = require("./database.service");
class MemoryService {
    /**
     * Get or create a user profile
     */
    async getUserProfile(userId) {
        const collection = database_service_1.databaseService.getUserProfilesCollection();
        let profile = await collection.findOne({ userId });
        if (!profile) {
            const newProfile = {
                userId,
                preferences: {},
                interests: [],
                conversationHistory: [],
                personalDetails: {},
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            await collection.insertOne(newProfile);
            profile = await collection.findOne({ userId });
        }
        return profile;
    }
    /**
     * Update user profile with new information
     */
    async updateUserProfile(userId, updates) {
        const collection = database_service_1.databaseService.getUserProfilesCollection();
        await collection.updateOne({ userId }, {
            $set: {
                ...updates,
                updatedAt: new Date(),
            },
        });
    }
    /**
     * Extract and store key information from conversation
     */
    async processConversationMemory(userId, userMessage, botResponse) {
        const profile = await this.getUserProfile(userId);
        // Extract potential personal information
        const nameMatch = userMessage.match(/(?:my name is|i'm|i am|call me)\s+(\w+)/i);
        if (nameMatch && nameMatch[1]) {
            profile.name = nameMatch[1];
            await this.updateUserProfile(userId, { name: nameMatch[1] });
        }
        // Extract preferences (favorite things)
        const favoriteMatch = userMessage.match(/(?:my favorite|i love|i like|i enjoy)\s+([^.!?]+)/i);
        if (favoriteMatch && favoriteMatch[1]) {
            const item = favoriteMatch[1].trim();
            if (!profile.interests.includes(item)) {
                profile.interests.push(item);
                await this.updateUserProfile(userId, { interests: profile.interests });
            }
        }
        // Extract location information
        const locationMatch = userMessage.match(/(?:i live in|i'm from|from)\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)*)/i);
        if (locationMatch && locationMatch[1]) {
            profile.personalDetails.location = locationMatch[1].split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
            await this.updateUserProfile(userId, { personalDetails: profile.personalDetails });
        }
        // Extract color preferences
        const colorMatch = userMessage.match(/(?:favorite color is|like|color is)\s+(red|blue|green|yellow|purple|orange|pink|black|white|brown|gray|grey|gold|silver|violet|indigo|turquoise|cyan|magenta|maroon|navy|teal|olive|lime|aqua|fuchsia|beige|tan|cream|ivory)/i);
        if (colorMatch && colorMatch[1]) {
            profile.preferences.favoriteColor = colorMatch[1].toLowerCase();
            await this.updateUserProfile(userId, { preferences: profile.preferences });
        }
        // Store any other mentioned details
        this.extractAndStoreDetails(userId, userMessage);
    }
    /**
     * Extract and store various personal details
     */
    async extractAndStoreDetails(userId, message) {
        const profile = await this.getUserProfile(userId);
        const updates = {};
        // Job/profession
        const jobMatch = message.match(/(?:i work as|i'm a|i am a)\s+([^.!?,]+)/i);
        if (jobMatch && jobMatch[1]) {
            profile.personalDetails.profession = jobMatch[1].trim();
            updates.personalDetails = profile.personalDetails;
        }
        // Hobbies
        const hobbyMatch = message.match(/(?:hobby|hobbies).*?(?:is|are)\s+([^.!?]+)/i);
        if (hobbyMatch && hobbyMatch[1]) {
            const hobbies = hobbyMatch[1].split(/,|and/).map(h => h.trim());
            profile.interests = [...new Set([...profile.interests, ...hobbies])];
            updates.interests = profile.interests;
        }
        if (Object.keys(updates).length > 0) {
            await this.updateUserProfile(userId, updates);
        }
    }
    /**
     * Add conversation summary to user's history
     */
    async addConversationSummary(userId, summary) {
        const collection = database_service_1.databaseService.getUserProfilesCollection();
        await collection.updateOne({ userId }, {
            $push: { conversationHistory: summary },
            $set: { updatedAt: new Date() },
        });
    }
    /**
     * Get user's conversation history context
     */
    async getConversationContext(userId) {
        const profile = await this.getUserProfile(userId);
        let context = '';
        if (profile.name) {
            context += `User's name: ${profile.name}. `;
        }
        if (profile.interests.length > 0) {
            context += `User's interests: ${profile.interests.join(', ')}. `;
        }
        if (profile.preferences.favoriteColor) {
            context += `User's favorite color: ${profile.preferences.favoriteColor}. `;
        }
        if (profile.personalDetails.location) {
            context += `User lives in: ${profile.personalDetails.location}. `;
        }
        if (profile.personalDetails.profession) {
            context += `User's profession: ${profile.personalDetails.profession}. `;
        }
        return context;
    }
}
exports.memoryService = new MemoryService();
//# sourceMappingURL=memory.service.js.map