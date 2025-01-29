import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { User } from "src/users/entities/user.entity";
import { NotImplementedException } from "@nestjs/common";
import { Expose, instanceToPlain } from "class-transformer";

@Entity("trigger")
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Trigger {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ readonly: true })
  type: string;

  @Expose({ name: "message" })
  get message(): string {
    throw new NotImplementedException();
  }

  async *concernedUsers(): AsyncIterable<User> {
    throw new NotImplementedException();
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
