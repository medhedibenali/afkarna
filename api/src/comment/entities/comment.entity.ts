import { User } from "src/users/entities/user.entity";
import { WorkspaceItem } from "src/workspace-item/entities/workspace-item.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reply } from "src/reply/entities/reply.entity";
@Entity("comment")
export class Comment {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "content", nullable: true })
    content: string;

    @Column("simple-array", { nullable: true })
    reactions: string[]; // e.g., ['heart', 'like']
    getReactionCounts(): Record<string, number> {
    return this.reactions.reduce((counts, reaction) => {
        counts[reaction] = (counts[reaction] || 0) + 1;
        return counts;
    }, {} as Record<string, number>);
    }

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    
    @ManyToOne(() => User, user => user.comments)
    user: User;
    
    @ManyToOne(() => WorkspaceItem, workspaceitem => workspaceitem.comments)
    workspaceitem: WorkspaceItem;

    @OneToMany(() => Reply, reply => reply.comment)
    reply: Reply[];
}
