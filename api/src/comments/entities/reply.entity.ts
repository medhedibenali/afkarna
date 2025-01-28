import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "src/users/entities/user.entity";
import { WorkspaceItem } from "src/workspace-item/entities/workspace-item.entity";
import { Comment } from "./comment.entity";

@Entity("reply")
export class Reply {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  comment: Comment;
}
