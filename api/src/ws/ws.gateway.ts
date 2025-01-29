import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { User } from "src/users/entities/user.entity";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class WsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ..._args: unknown[]) {
    const user: User | null = client.data.user;

    if (!user) {
      return;
    }

    client.join(`user:${user.id}`);
  }

  @SubscribeMessage("workspace:open")
  handleOpenWorkspace(
    @MessageBody()
    { workspaceId }: { workspaceId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`workspace:${workspaceId}`);
  }

  @SubscribeMessage("workspace:message")
  handleMessageWorkspace(
    @MessageBody()
    { workspaceId, message }: { workspaceId: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    if (!client.data.user) {
      return;
    }

    this.server.to(`workspace:${workspaceId}`).emit("message", {
      message,
      user: client.data.user,
      createdAt: new Date(),
    });
  }

  @SubscribeMessage("ping")
  handlePing(): string {
    return "pong";
  }

  @SubscribeMessage("identity")
  handleIdentity(@MessageBody() data: unknown) {
    return data;
  }

  @SubscribeMessage("whoami")
  handleWhoami(@ConnectedSocket() client: Socket): string {
    return client.data.user?.username;
  }
}
