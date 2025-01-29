import { Component, input, inject, computed, model } from '@angular/core';
import { Comment } from '../../models/comment';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../comment.service';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-comment-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-detail.component.html',
  styleUrl: './comment-detail.component.css',
})
export class CommentDetailComponent {
  commentService = inject(CommentService);

  comment = input.required<Comment>();
  profilePicture = computed(() => {
    const profilePicture = this.comment().user.profilePicture;

    return profilePicture
      ? `${environment.apiUrl}/assets/${profilePicture}`
      : 'AvatarImage.png';
  });

  content = model('');

  addComment(): void {
    const newComment = {
      content: this.content(),
      userId: 'user-id',
      workspaceItemId: 'workspaceitem-id',
    };

    this.commentService.createComment(newComment).subscribe({
      error: (err) => {
        console.error('Error creating comment:', err);
      },
    });

    this.content.set('');
  }
}
