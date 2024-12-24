import { INestApplicationContext } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server, ServerOptions } from "socket.io";
import { AuthService } from "src/auth/auth.service";

export class WsIoAdapter extends IoAdapter {
    private authService: AuthService;

    constructor(
        private app: INestApplicationContext,
    ) {
        super(app);
        this.authService = this.app.get(AuthService);
    }

    createIOServer(port: number, options?: ServerOptions): any {
        const server: Server = super.createIOServer(port, options);

        server.use(async (socket, next) => {
            const token = socket.handshake.auth.token;
            socket.data.user = await this.authService.verifyNonce(token);

            next();
        });

        return server;
    }
}
