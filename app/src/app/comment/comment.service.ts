import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comment } from './../comment model/comment';
import { API } from '../../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient);

  private comments: Comment[] = [];

  #selectComment = signal<Comment | null>(null);
  selectedComment = this.#selectComment.asReadonly();

  getComments() {
    return this.http.get<Comment[]>(API.comment);
  }
  addCv(comment: Comment): Observable<any> {
    return this.http.post<any>(API.comment, comment);
  }
  getCvById(id: string): Observable<Comment> {
    return this.http.get<Comment>(API.comment + id);
  }
  selectComment(comment: Comment) {
    this.#selectComment.set(comment);
  }
  createComment(comment: any): Observable<Comment> {
    return this.http.post<Comment>(API.comment, comment);
  }
}
