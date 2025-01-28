import { Component, input, inject } from '@angular/core';
import { Comment } from '../comment model/comment';
import { CommonModule } from '@angular/common';
import { CommentService } from '../comment/comment.service';

@Component({
  selector: 'app-comment-detail',
  imports: [CommonModule],
  templateUrl: './comment-detail.component.html',
  styleUrl: './comment-detail.component.css'
})
export class CommentDetailComponent {
  commentService= inject(CommentService)
  comment= input.required<Comment | null>();

  addComment(content: string): void {
    const newComment = {
      content,
      userId: 'user-id',
      workspaceItemId: 'workspaceitem-id',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      replies: [],
    };

    this.commentService.createComment(newComment).subscribe({
      next: (createdComment) => {
      },
      error: (err) => {
        console.error('Error creating comment:', err);
      },
    });
  }

}
