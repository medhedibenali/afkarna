import { User } from "src/users/entities/user.entity";
import { Workspace } from "src/workspace/entities/workspace.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Notification } from "./notification.entity";

@Entity("invitation")
export class Invitation {
    @PrimaryGeneratedColumn("uuid")
    id: string;

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

    @OneToOne(() => Notification)
    @JoinColumn({ name: "notification_id" })
    notification: Notification;

    @Column({ name: "notification_id" })
    notificationId: string;

}
