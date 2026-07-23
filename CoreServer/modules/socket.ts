import { Server as SocketIOServer, Socket } from 'socket.io';

export function registerSocketHandlers(io: SocketIOServer): void {
    io.on('connection', (socket: Socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.emit('welcome', { message: 'Connected to CoreServer' });

        socket.on('message', (payload: unknown) => {
            const text = typeof payload === 'string' ? payload : 'hello';
            io.emit('message', { from: socket.id, text });
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}
