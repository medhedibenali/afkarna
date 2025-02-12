import { inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Comment, NewComment } from "./models/comment";
import { API } from "../../config/api.config";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  private http = inject(HttpClient);

  #selectComment = signal<Comment | null>(null);
  selectedComment = this.#selectComment.asReadonly();

  getComments() {
    return this.http.get<{ data: Comment[]; count: number }>(API.comment);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(API.comment, comment);
  }

  getCommentById(id: string): Observable<Comment> {
    return this.http.get<Comment>(API.comment + id);
  }

  selectComment(comment: Comment) {
    this.#selectComment.set(comment);
  }

  createComment(comment: NewComment): Observable<Comment> {
    return this.http.post<Comment>(API.comment, comment);
  }
}
