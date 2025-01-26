import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { SendInvitationEvent } from "./send-invitation.event";
import { WsService } from "../ws/ws.service";

@Injectable()
export class EventsHandler {
  constructor(private wsService: WsService) {}

  @OnEvent("invitation.created")
  handleInvitationCreatedEvent(payload: SendInvitationEvent) {
    this.wsService.emit(
      "notification:new",
      {
        data: {
          message: `You have been invited to join ${payload.invitation.workspace.name}`,
          Invitation: payload.invitation,
        },
      },
      `user:${payload.invitation.invitedUser.id}`,
    );
  }
}
