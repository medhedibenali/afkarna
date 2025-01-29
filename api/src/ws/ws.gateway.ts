import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { BroadcastOperator, Server, Socket } from "socket.io";
import { User } from "src/users/entities/user.entity";
import { WsService } from "./ws.service";
import {
  DecorateAcknowledgementsWithMultipleResponses,
  DefaultEventsMap,
} from "socket.io/dist/typed-events";
import { Event } from "./models/event.model";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class WsGateway implements OnGatewayInit, OnGatewayConnection {
  constructor(private wsService: WsService) {}

  afterInit(server: Server) {
    this.wsService.events$.subscribe(({ event, data, to, except }: Event) => {
      let serverInstance:
        | Server
        | BroadcastOperator<
            DecorateAcknowledgementsWithMultipleResponses<DefaultEventsMap>,
            unknown
          > = server;

      if (to) {
        serverInstance = serverInstance.to(to);
      }

      if (except) {
        serverInstance = serverInstance.except(except);
      }

      serverInstance.emit(event, data);
    });
  }

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
