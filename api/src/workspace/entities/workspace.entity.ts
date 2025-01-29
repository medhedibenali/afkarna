import { instanceToPlain } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { WorkspaceItem } from 'src/workspace-item/entities/workspace-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('workspace')
export class Workspace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => WorkspaceItem, (item) => item.workspace, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'root_collection_id' })
  collection: WorkspaceItem;

  @ManyToOne(() => User, (user) => user.workspaces)
  @JoinColumn({ name: "user_id" })
  user: User;

  toJSON() {
    return instanceToPlain(this);
  }
}
