import { User } from "src/users/entities/user.entity";
import { Workspace } from "src/workspace/entities/workspace.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("comment")
export class Comment {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ name: "name", nullable: true })
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

    @ManyToOne(() => Comment, comment => comment.replies, { nullable: true })
    parentComment: Comment;

    @OneToMany(() => Comment, comment => comment.parentComment)
    replies: Comment[];
    
    @ManyToOne(() => Workspace, workspace => workspace.comments)
    workspace: Workspace;
}
