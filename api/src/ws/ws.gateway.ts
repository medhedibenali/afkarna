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
    @MessageBody() body: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(body);
    const { workspaceId } = JSON.parse(body);
    client.join(`workspace:${workspaceId}`);
  }

  @SubscribeMessage("workspace:message")
  handleMessageWorkspace(
    @MessageBody() body: string,
    @ConnectedSocket() client: Socket,
  ) {
    const { workspaceId, message } = JSON.parse(body);

    this.server
      .to(`workspace:${workspaceId}`)
      .emit("message", {
      message,
      user: client.data.user,
      createdAt: new Date()
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
