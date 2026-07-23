import { Express, Request, Response } from 'express';

export function registerHttpRoutes(app: Express): void {
    app.get('/health', (_req: Request, res: Response) => {
        res.json({ ok: true, service: 'CoreServer' });
    });

    app.get('/api/messages', (_req: Request, res: Response) => {
        res.json({ messages: ['hello', 'world'] });
    });

    app.post('/api/messages', (req: Request, res: Response) => {
        const message = req.body?.message ?? 'empty';
        res.status(201).json({ received: message });
    });
}
