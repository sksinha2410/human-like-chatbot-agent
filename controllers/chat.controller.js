"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = exports.ChatController = void 0;
const chatbot_service_1 = require("../services/chatbot.service");
class ChatController {
    /**
     * Handle chat message
     */
    async chat(req, res) {
        try {
            const { userId, message, sessionId } = req.body;
            if (!userId || !message) {
                res.status(400).json({
                    error: 'userId and message are required',
                });
                return;
            }
            const result = await chatbot_service_1.chatbotService.chat(userId, message, sessionId);
            res.json({
                reply: result.reply,
                sessionId: result.sessionId,
                timestamp: new Date(),
            });
        }
        catch (error) {
            console.error('Chat controller error:', error);
            res.status(500).json({
                error: 'Failed to process chat message',
            });
        }
    }
    /**
     * Get bot persona
     */
    async getPersona(req, res) {
        try {
            const persona = chatbot_service_1.chatbotService.getPersona();
            res.json(persona);
        }
        catch (error) {
            console.error('Get persona error:', error);
            res.status(500).json({
                error: 'Failed to get persona',
            });
        }
    }
    /**
     * Health check
     */
    async health(req, res) {
        res.json({
            status: 'healthy',
            timestamp: new Date(),
        });
    }
}
exports.ChatController = ChatController;
exports.chatController = new ChatController();
//# sourceMappingURL=chat.controller.js.map