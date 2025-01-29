import { Component, input, output, signal } from "@angular/core";
import { Notification } from "../../ws/model/notification";
import { NotificationService } from "../../ws/notification.service";
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: "app-notif-item",
  imports: [MatMenuModule],
  templateUrl: "./notif-item.component.html",
  styleUrl: "./notif-item.component.css",
})
export class NotifItemComponent {
  notification = input<Notification>();
  isInvitation = false;
  isHandled = signal<boolean>(false);
  update = output();
  constructor(private notifService: NotificationService) {
    this.isInvitation = this.notification()?.trigger.type === "invitation";
    this.isHandled.set(this.notification()?.handled!);
  }

  accept() {
    this.notifService.acceptInvitation(this.notification()?.trigger.id!)
      .subscribe(() => {
        this.isHandled.set(true);
        this.notification()!.handled = true;
        this.update.emit();
      });
  }

  refuse() {
    this.notifService.refuseInvitation(this.notification()?.trigger.id!)
      .subscribe(() => {
        this.isHandled.set(true);
        this.notification()!.handled = true;
        this.update.emit();
      });
  }
}
