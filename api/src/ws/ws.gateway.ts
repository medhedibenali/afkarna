import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { User } from "src/users/entities/user.entity";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class WsGateway implements OnGatewayConnection {
  handleConnection(client: Socket, ..._args: unknown[]) {
    const user: User | null = client.data.user;

    if (!user) {
      return;
    }

    client.join(`user:${user.id}`);
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
