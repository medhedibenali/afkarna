import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommentService } from './comment.service';
import { CommonModule } from '@angular/common';
import { Comment} from './../comment model/comment'
import { CommentListComponent } from "../comment-list/comment-list.component";
import { CommentDetailComponent } from "../comment-detail/comment-detail.component";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  imports: [CommonModule, CommentListComponent, CommonModule, CommentDetailComponent],
  styleUrls: ['./comment.component.css'],
})

export class CommentComponent implements OnInit {
  private commentService = inject(CommentService);

  constructor() {}

  comments: WritableSignal<Comment[]> = signal([]);
  selectedComment = this.commentService.selectedComment;

  ngOnInit(): void {
    // Fetch initial comments
    this.commentService.getComments().subscribe({
      next: (comments) => {
        this.comments.set(comments);
      },
      error: (err) => {
        console.error('Error fetching comments:', err);
      },
    });
 /*
    // Listen for new comments
    this.commentService.onCommentCreated().subscribe({
      next: (comment) => {
        this.comments.push(comment);
      },
      error: (err) => {
        console.error('Error receiving new comment:', err);
      },
    });
    */
  }

 

 /* incrementReaction(
    comment: any,
    reactionType: 'likesCount' | 'heartsCount'
  ): void {
    comment[reactionType]++;
    this.commentService.updateComment(comment).subscribe({
      error: (err) => {
        console.error('Error updating comment:', err);
        comment[reactionType]--; // Rollback on error
      },
    });
  }
  */
}
