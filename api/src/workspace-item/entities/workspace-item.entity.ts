import { instanceToPlain } from "class-transformer";
import { Workspace } from "src/workspace/entities/workspace.entity";
import { Comment } from "src/comments/entities/comment.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("workspace_item")
export class WorkspaceItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", nullable: false })
  name: string;

  @Column({ name: "type", nullable: false, enum: ["note", "collection"] })
  type: string;

  @Column({ name: "content", nullable: true })
  content: string;

  @ManyToOne(() => WorkspaceItem, (workspaceItem) => workspaceItem.children, {
    nullable: true,
    onDelete: "CASCADE",
  })
  parent: WorkspaceItem;

  @OneToMany(() => WorkspaceItem, (workspaceItem) => workspaceItem.parent)
  children: WorkspaceItem[];

  @OneToOne(() => Workspace, (workspace) => workspace.collection, {
    nullable: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  workspace: Workspace;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Comment, (comment) => comment.workspaceItem)
  comments: Comment[];

  toJSON() {
    return instanceToPlain(this);
  }
}
