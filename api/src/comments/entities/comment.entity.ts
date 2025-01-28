import { User } from "src/users/entities/user.entity";
import { WorkspaceItem } from "src/workspace-item/entities/workspace-item.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Reply } from "./reply.entity";

@Entity("comment")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => WorkspaceItem, (workspaceItem) => workspaceItem.comments)
  workspaceItem: WorkspaceItem;

  @OneToMany(() => Reply, (reply) => reply.comment)
  replies: Reply[];
}
