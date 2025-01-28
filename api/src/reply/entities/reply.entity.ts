import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "src/comment/entities/comment.entity";
import { User } from "src/users/entities/user.entity";
import { WorkspaceItem } from "src/workspace-item/entities/workspace-item.entity";

@Entity("reply")
export class Reply {

    @PrimaryGeneratedColumn("uuid")
        id: string;
    
    @Column({ name: "content", nullable: true })
        content: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
            createdAt: Date;
            
    @ManyToOne(() => User, user => user.comments)
        user: User;
        
    @ManyToOne(() => WorkspaceItem, workspaceitem => workspaceitem.comments)
        workspaceitem: WorkspaceItem;
    
    @ManyToOne(() => Comment, comment => comment.reply)
    comment: Comment;
       
}
