import { instanceToPlain } from 'class-transformer';
import { WorkspaceItem } from 'src/workspace-item/entities/workspace-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';

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

  toJSON() {
    return instanceToPlain(this);
  }
  @OneToMany(() => Comment, comment => comment.workspace)
  comments: Comment[];
}
