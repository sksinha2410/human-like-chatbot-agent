"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    gemini: {
        apiKey: process.env.GEMINI_API_KEY || '',
        model: 'gemini-2.0-flash-exp',
    },
    server: {
        port: parseInt(process.env.PORT || '3000', 10),
        env: process.env.NODE_ENV || 'development',
    },
    persona: {
        name: process.env.CHATBOT_NAME || 'Alex',
        age: parseInt(process.env.CHATBOT_AGE || '25', 10),
        location: process.env.CHATBOT_LOCATION || 'San Francisco',
        interests: (process.env.CHATBOT_INTERESTS || 'technology,music,travel,philosophy').split(','),
    },
};
//# sourceMappingURL=index.js.map