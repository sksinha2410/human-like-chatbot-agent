import { Request, Response } from 'express';
import { chatbotService } from '../services/chatbot.service';
import { ChatRequest } from '../types';

export class ChatController {
  /**
   * Handle chat message
   */
  async chat(req: Request, res: Response): Promise<void> {
    try {
      const { userId, message, sessionId } = req.body as ChatRequest;

      if (!userId || !message) {
        res.status(400).json({
          error: 'userId and message are required',
        });
        return;
      }

      const result = await chatbotService.chat(userId, message, sessionId);

      res.json({
        reply: result.reply,
        sessionId: result.sessionId,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Chat controller error:', error);
      res.status(500).json({
        error: 'Failed to process chat message',
      });
    }
  }

  /**
   * Get bot persona
   */
  async getPersona(req: Request, res: Response): Promise<void> {
    try {
      const persona = chatbotService.getPersona();
      res.json(persona);
    } catch (error) {
      console.error('Get persona error:', error);
      res.status(500).json({
        error: 'Failed to get persona',
      });
    }
  }

  /**
   * Health check
   */
  async health(req: Request, res: Response): Promise<void> {
    res.json({
      status: 'healthy',
      timestamp: new Date(),
    });
  }
}

export const chatController = new ChatController();
