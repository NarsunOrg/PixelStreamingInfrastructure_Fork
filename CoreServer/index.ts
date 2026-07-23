import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { registerHttpRoutes } from './modules/http';
import { registerSocketHandlers } from './modules/socket';

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
    cors: {
        origin: '*'
    }
});

const PORT = Number(process.env.PORT || 3000);

app.use(express.json());
registerHttpRoutes(app);
registerSocketHandlers(io);

httpServer.listen(PORT, () => {
    console.log(`CoreServer running on http://localhost:${PORT}`);
});
