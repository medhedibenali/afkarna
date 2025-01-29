import { Exclude, instanceToPlain } from "class-transformer";
import { Workspace } from "src/workspace/entities/workspace.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ name: "profile_picture", nullable: true })
  profilePicture: string;

  @OneToMany(() => Workspace, (workspace) => workspace.user)
  workspaces: Workspace[];

  @CreateDateColumn()
  createdAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
