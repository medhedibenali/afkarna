import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { SendInvitationEvent } from "./send-invitation.event";
import { Server } from 'socket.io';
import { Invitation } from "src/notifications/entities/invitation.entity";

@Injectable()
export class EventsHandler {
    private server: Server;
    constructor() {
        this.server = new Server();
    }

    @OnEvent('invitation.created')
    handleInvitationCreatedEvent(payload: SendInvitationEvent) {
                this.server.emit(`user:${payload.invitation.invitedUser.id}`, {
                    data: {
                        message: `You have been invited to join ${payload.invitation.workspace.name}`,
                        Invitation: payload.invitation
                    }
                });
    }
}
