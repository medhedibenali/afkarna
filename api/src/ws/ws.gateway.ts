import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { User } from "src/users/entities/user.entity";

@WebSocketGateway({
  path: "/ws/",
  cors: {
    origin: "*",
  },
})
export class WsGateway implements OnGatewayConnection {
  handleConnection(client: Socket, ..._args: any[]) {
    const user: User | null = client.data.user;

    if (!user) {
      return;
    }

    client.join(`users/${user.username}`);
  }

  @SubscribeMessage("ping")
  handlePing(_client: unknown, _payload: unknown): string {
    return "pong";
  }

  @SubscribeMessage("whoami")
  handleWhoami(client: Socket, _payload: unknown): string {
    return client.data.user?.username;
  }
}
