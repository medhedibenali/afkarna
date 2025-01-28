import { User } from "src/users/entities/user.entity";
import { Workspace } from "src/workspace/entities/workspace.entity";
import { ChildEntity, Column, JoinColumn, ManyToOne } from "typeorm";
import { Trigger } from "src/notifications/entities/trigger.entity";
import { InvitationStatus } from "../enums/invitation-status.enum";

@ChildEntity("invitation")
export class Invitation extends Trigger {
    @ManyToOne(() => Workspace)
    @JoinColumn({ name: "workspace_id" })
    workspace: Workspace;

    @Column({ name: "workspace_id" })
    workspaceId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "invited_user_id" })
    invitedUser: User;

    @Column({ name: "invited_user_id" })
    invitedUserId: string;

    @Column({
        type: "enum",
        enum: InvitationStatus,
        default: InvitationStatus.Pending,
    })
    status: InvitationStatus;

    get message() {
        return "invitation";
    }

    concernedUsers() {
        return [this.invitedUser];
    }
}
