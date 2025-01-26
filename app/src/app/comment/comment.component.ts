import { Component, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  imports:[CommonModule,BrowserModule],
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments: any[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    // Fetch initial comments
    this.commentService.getComments().subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (err) => {
        console.error('Error fetching comments:', err);
      }
    });

    // Listen for new comments
    this.commentService.onCommentCreated().subscribe({
      next: (comment) => {
        this.comments.push(comment);
      },
      error: (err) => {
        console.error('Error receiving new comment:', err);
      }
    });
  }

  addComment(content: string): void {
    const newComment = {
      content,
      userId: 'user-id',
      workspaceId: 'workspace-id',
      creationTime: new Date().toISOString(),
      likesCount: 0,
      heartsCount: 0
    };

    this.commentService.createComment(newComment).subscribe({
      next: (createdComment) => {
        this.comments.push(createdComment);
      },
      error: (err) => {
        console.error('Error creating comment:', err);
      }
    });
  }

  incrementReaction(comment: any, reactionType: 'likesCount' | 'heartsCount'): void {
    comment[reactionType]++;
    this.commentService.updateComment(comment).subscribe({
      error: (err) => {
        console.error('Error updating comment:', err);
        comment[reactionType]--; // Rollback on error
      }
    });
  }
}
