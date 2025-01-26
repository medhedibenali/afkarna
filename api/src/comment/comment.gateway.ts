import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class CommentGateway {
  @WebSocketServer()
  server: Server;

  emitCommentCreated(comment: any) {
    this.server.emit('commentCreated', comment);
  }

  emitCommentUpdated(comment: any) {
    this.server.emit('commentUpdated', comment);
  }

  emitCommentDeleted(commentId: number) {
    this.server.emit('commentDeleted', commentId);
  }
}