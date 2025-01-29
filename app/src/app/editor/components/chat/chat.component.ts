import { Component, inject, OnInit, signal, WritableSignal, input } from '@angular/core';
import { WsService } from '../../../ws/ws.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface chatMessage {
  message: string;
  user: any;
  createdAt: Date;
}
@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent implements OnInit {

  private wsService = inject(WsService);
  workspaceId = input.required<string>;
  messages: WritableSignal<chatMessage[]> = signal([]);
  message: string = '';
  //user: User;

  ngOnInit() {
    this.wsService.emit('workspace:open', { workspaceId: this.workspaceId() }).subscribe()
    this.wsService.fromEvent<chatMessage>('message').subscribe((message) => {
      this.messages.update((messages) => [...messages, message]);
    });
  }

  sendMessage() {
    if (this.message.trim()) {
      console.log('sending message', this.message);
      this.wsService.emit('workspace:message', { 
        workspaceId: this.workspaceId(), 
        message: { message: this.message, user: this.user, createdAt: new Date() } 
      }
      ).subscribe();
      this.message = '';
    }
  }
}
