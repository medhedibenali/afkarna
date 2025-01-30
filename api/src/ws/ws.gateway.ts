import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from "@nestjs/websockets";
import { BroadcastOperator, Server, Socket } from "socket.io";
import { User } from "src/users/entities/user.entity";
import { WsService } from "./ws.service";
import {
  DecorateAcknowledgementsWithMultipleResponses,
  DefaultEventsMap,
} from "socket.io/dist/typed-events";
import { Event } from "./models/event.model";
import { WorkspaceItemService } from "src/workspace-item/workspace-item.service";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class WsGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  constructor(
    private wsService: WsService,
    private workspaceItemService: WorkspaceItemService,
  ) {}

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

  @SubscribeMessage("workspace:open")
  handleWorkspaceOpen(
    @MessageBody() { workspace },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`workspace:${workspace}`);
  }

  @SubscribeMessage("workspace:close")
  handleWorkspaceClose(
    @MessageBody() { workspace },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`workspace:${workspace}`);
  }

  @SubscribeMessage("workspace:message")
  handleWorkspaceMessage(
    @MessageBody() { workspace, content },
    @ConnectedSocket() client: Socket,
  ) {
    if (!client.data.user) {
      return;
    }

    if (typeof content !== "string") {
      throw new WsException("Invalid message type.");
    }

    this.server.to(`workspace:${workspace}`).emit("workspace:message", {
      id: crypto.randomUUID(),
      content,
      user: client.data.user,
      createdAt: new Date(),
    });
  }

  @SubscribeMessage("note:open")
  handleNoteOpen(@MessageBody() { note }, @ConnectedSocket() client: Socket) {
    client.join(`note:${note}`);

    return this.workspaceItemService.findOne(note);
  }

  @SubscribeMessage("note:close")
  handleNoteClose(@MessageBody() { note }, @ConnectedSocket() client: Socket) {
    client.leave(`note:${note}`);
  }

  @SubscribeMessage("note:update")
  async handleNoteUpdate(@MessageBody() { note, content }) {
    await this.workspaceItemService.update(note, { content });

    this.server.to(`note:${note}`).emit("note:update", {
      id: note,
      content,
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
