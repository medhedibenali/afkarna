import { Exclude, instanceToPlain } from "class-transformer";
import { WorkspaceItem } from "src/workspace-item/entities/workspace-item.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("workspace")
export class Workspace {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", nullable: false })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => WorkspaceItem,(item) => item.workspace)
  @JoinColumn({ name: "root_collection_id" })
  collection: WorkspaceItem;

  toJSON() {
    return instanceToPlain(this);
  }
}
