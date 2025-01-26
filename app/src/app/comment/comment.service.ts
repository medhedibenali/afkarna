import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService implements OnDestroy {


  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000', {
      reconnectionAttempts: 5, // Retry connection
      timeout: 10000 // Timeout for connection attempts
    });

    this.socket.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err);
    });
  }

  /** Emits a new comment to the server */
  createComment(comment: any): Observable<any> {
    return new Observable((observer) => {
      this.socket.emit('createComment', comment, (response: any) => {
        if (response.error) {
          observer.error(response.error);
        } else {
          observer.next(response);
        }
      });
    });
  }

  /** Fetches all comments from the server */
  getComments(): Observable<any[]> {
    return new Observable((observer) => {
      this.socket.emit('getComments');
      this.socket.on('comments', (comments) => {
        observer.next(comments);
      });

      return () => {
        this.socket.off('comments');
      };
    });
  }

  /** Listens for newly created comments */
  onCommentCreated(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('commentCreated', (comment) => {
        observer.next(comment);
      });

      return () => {
        this.socket.off('commentCreated');
      };
    });
  }

  updateComment(comment: any) :Observable<any> {
    return new Observable((observer) => {
      this.socket.emit('updateComment', comment, (response: any) => {
        if (response.error) {
          observer.error(response.error);
        } else {
          observer.next(response);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
    this.socket.removeAllListeners();
  }

}
