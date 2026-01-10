import { Request, Response } from 'express';
export declare class ChatController {
    /**
     * Handle chat message
     */
    chat(req: Request, res: Response): Promise<void>;
    /**
     * Get bot persona
     */
    getPersona(req: Request, res: Response): Promise<void>;
    /**
     * Health check
     */
    health(req: Request, res: Response): Promise<void>;
}
export declare const chatController: ChatController;
//# sourceMappingURL=chat.controller.d.ts.map