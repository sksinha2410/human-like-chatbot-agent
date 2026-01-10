import { BotPersona } from '../types';
declare class ChatbotService {
    private genAI;
    private persona;
    constructor();
    /**
     * Build system prompt with persona and user context
     */
    private buildSystemPrompt;
    /**
     * Detect tone from user message
     */
    private detectTone;
    /**
     * Get or create chat session
     */
    private getOrCreateSession;
    /**
     * Update chat session
     */
    private updateSession;
    /**
     * Generate response using Gemini
     */
    chat(userId: string, userMessage: string, sessionId?: string): Promise<{
        reply: string;
        sessionId: string;
    }>;
    /**
     * Get persona information
     */
    getPersona(): BotPersona;
}
export declare const chatbotService: ChatbotService;
export {};
//# sourceMappingURL=chatbot.service.d.ts.map