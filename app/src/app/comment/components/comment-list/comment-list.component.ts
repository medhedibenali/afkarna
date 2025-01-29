import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { Comment } from '../../models/comment';
import { CommentDetailComponent } from '../comment-detail/comment-detail.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
  standalone: true,
  imports: [NgClass, CommentDetailComponent],
})
export class CommentListComponent {
  comments = input<Comment[]>();
}
