import { Exclude, instanceToPlain } from "class-transformer";
import { Workspace } from "src/workspace/entities/workspace.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ name: "type", nullable: false ,enum: ['note', 'collection']})
  type: string;

  @Column({ name: "content", nullable: true })
  content: string;

  @OneToMany(() => WorkspaceItem, (item) => item.parent, { nullable: true , onDelete: 'CASCADE'})
  @JoinColumn({ name: "parent_id" })
  parent: WorkspaceItem;  

  @OneToOne(() => Workspace, (workspace) => workspace.collection, { nullable: true })
  workspace: Workspace;


  @CreateDateColumn()
  createdAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
