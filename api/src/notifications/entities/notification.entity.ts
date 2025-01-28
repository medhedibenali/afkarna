import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Trigger } from "./trigger.entity";

@Entity("notification")
export class Notification {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User)
    recipient: User;

    @ManyToOne(() => Trigger)
    trigger: Trigger;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: "bool", default: false })
    handled: boolean;

    @Column({ type: "bool", default: false })
    read: boolean;
}
