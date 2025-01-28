import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity("trigger")
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Trigger {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    abstract get message(): string;
    
    abstract concernedUsers(): User[];
}
