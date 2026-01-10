import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { config } from './config';
import { databaseService } from './services/database.service';
import { chatController } from './controllers/chat.controller';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/chat', (req: Request, res: Response) => chatController.chat(req, res));
app.get('/api/persona', (req: Request, res: Response) => chatController.getPersona(req, res));
app.get('/api/health', (req: Request, res: Response) => chatController.health(req, res));

// Root route
app.get('/', (req: Request, res: Response) => {
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
    await databaseService.connect();
    
    // Start listening
    app.listen(config.server.port, () => {
      console.log(`Server running on port ${config.server.port}`);
      console.log(`Environment: ${config.server.env}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await databaseService.disconnect();
  process.exit(0);
});

startServer();

export default app;
