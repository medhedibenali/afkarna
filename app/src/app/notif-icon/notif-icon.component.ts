import { Component, inject, signal, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { AuthService } from '../auth/services/auth.service';
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";
import { NotificationService } from '../ws/notification.service';
import { Notification } from '../ws/model/notification';
import { NotifItemComponent } from "./notif-item/notif-item.component";
import { WsService } from '../ws/ws.service';


@Component({
  selector: 'app-notif-icon',
  imports: [MatIconModule, MatButtonModule, MatBadgeModule, MatMenuModule, MatDividerModule, NotifItemComponent],
  templateUrl: './notif-icon.component.html',
  styleUrl: './notif-icon.component.css'
})
export class NotifIconComponent {
  contextMenuPosition = { x: "0px", y: "0px" };
  notifications = signal<Notification[]>([])
  messages = inject(WsService).fromEvent("notification:new").subscribe(data => {
      console.log(data);
    });
  item = {name : 'Hallo World'};
  constructor(private notifService : NotificationService , private wsService : WsService) {
    this.notifService.getNotifications().subscribe(
      (response) => {
          this.notifications.set(response.data)
      });
      
    this.wsService.fromEvent("notification:new").subscribe((newNotif : any) => {
      const newNotification = new Notification(newNotif.id , newNotif.createdAt, newNotif.handled, newNotif.read, newNotif.trigger);
      this.notifications.update(notifs => [...notifs, newNotification]);
    });
  }

  toggleNotifications() {
    console.log(this.notifications());
    
  }

  @ViewChild(MatMenuTrigger)
  contextMenu!: MatMenuTrigger;

  onLeftClick(event: MouseEvent, item: any) {
    this.toggleNotifications();
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item };
    this.contextMenu.menu?.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
