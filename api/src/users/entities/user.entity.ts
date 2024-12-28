import { Exclude, instanceToPlain } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @CreateDateColumn()
  createdAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
