import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { WsService } from "../ws/ws.service";
import { NotificationsService } from "src/notifications/notifications.service";
import { Trigger } from "src/notifications/entities/trigger.entity";

@Injectable()
export class EventsHandler {
  constructor(
    private readonly wsService: WsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @OnEvent("trigger.created")
  async triggerCreationHandler(trigger: Trigger) {
    for await (const user of trigger.concernedUsers()) {
      const notification = await this.notificationsService.create({
        trigger,
        recipient: user,
      });

      this.wsService.emit(
        "notification:new",
        notification,
        `user:${notification.recipient.id}`,
      );
    }
  }
}
