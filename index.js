"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const database_service_1 = require("./services/database.service");
const chat_controller_1 = require("./controllers/chat.controller");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.post('/api/chat', (req, res) => chat_controller_1.chatController.chat(req, res));
app.get('/api/persona', (req, res) => chat_controller_1.chatController.getPersona(req, res));
app.get('/api/health', (req, res) => chat_controller_1.chatController.health(req, res));
// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Human-Like Chatbot Agent API',
        version: '1.0.0',
        endpoints: {
            chat: 'POST /api/chat',
            persona: 'GET /api/persona',
            health: 'GET /api/health',
        },
    });
});
// Start server
const startServer = async () => {
    try {
        // Connect to database
        await database_service_1.databaseService.connect();
        // Start listening
        app.listen(config_1.config.server.port, () => {
            console.log(`Server running on port ${config_1.config.server.port}`);
            console.log(`Environment: ${config_1.config.server.env}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
// Handle shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await database_service_1.databaseService.disconnect();
    process.exit(0);
});
startServer();
exports.default = app;
//# sourceMappingURL=index.js.map