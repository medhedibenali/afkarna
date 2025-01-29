import { Component, input, signal } from '@angular/core';
import { Notification } from '../../ws/model/notification';
import { NotificationService } from '../../ws/notification.service';
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";

@Component({
  selector: 'app-notif-item',
  imports: [MatMenuModule],
  templateUrl: './notif-item.component.html',
  styleUrl: './notif-item.component.css'
})
export class NotifItemComponent {
   notification = input<Notification>();
   isInvitation = false;
   isHandled = signal<boolean>(false) ;
  constructor(private notifService: NotificationService){
    this.isInvitation = this.notification()?.trigger.type === 'invitation';
    this.isHandled.set(this.notification()?.handled!);
  }

  accept(){
    this.notifService.acceptInvitation(this.notification()?.trigger.id!).subscribe(response => {
      console.log(response);
      this.isHandled.set(true);
    })
    console.log("accepted");
  }

  refuse(){
    this.notifService.refuseInvitation(this.notification()?.trigger.id!).subscribe(response => {
      console.log(response);
      this.isHandled.set(true);
    })
    console.log("accepted");
  }
}
