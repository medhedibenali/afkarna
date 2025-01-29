import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
  input,
} from '@angular/core';
import { WsService } from '../../../ws/ws.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ChatMessage {
  message: string;
  user: any;
  createdAt: Date;
}
@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  private wsService = inject(WsService);
  workspaceId = input.required<string>();
  messages: WritableSignal<ChatMessage[]> = signal([]);
  message: string = '';
  //user: User;

  ngOnInit() {
    this.wsService
      .emit('workspace:open', { workspaceId: this.workspaceId() })
      .subscribe();
    this.wsService.fromEvent<ChatMessage>('message').subscribe((message) => {
      this.messages.update((messages) => [...messages, message]);
    });
  }

  sendMessage() {
    if (!this.message.trim()) {
      return;
    }

    this.wsService
      .emit('workspace:message', {
        workspaceId: this.workspaceId(),
        message: this.message,
      })
      .subscribe();
    this.message = '';
  }
}
