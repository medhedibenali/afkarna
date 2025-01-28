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

  @Column({ name: "recipient_id" })
  recipientId: string;

  @ManyToOne(() => Trigger, { eager: true })
  trigger: Trigger;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: "bool", default: false })
  handled: boolean;

  @Column({ type: "bool", default: false })
  read: boolean;
}
