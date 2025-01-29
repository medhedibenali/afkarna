import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  @JoinColumn({ name: "recipient_id" })
  recipient: User;

  @Column({ name: "recipient_id", nullable: false })
  recipientId: string;

  @ManyToOne(() => Trigger, { eager: true })
  @JoinColumn({ name: "trigger_id" })
  trigger: Trigger;

  @Column({ name: "trigger_id", nullable: false })
  triggerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: "bool", default: false })
  handled: boolean;

  @Column({ type: "bool", default: false })
  read: boolean;
}
