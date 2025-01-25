import { Invitation } from "src/notifications/entities/invitation.entity";

export class SendInvitationEvent {
    constructor(public invitation : Invitation) {}
}
