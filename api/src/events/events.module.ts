import { Module } from "@nestjs/common";
import { EventsHandler } from "./events.handler";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { WsModule } from "src/ws/ws.module";
import { NotificationsModule } from "src/notifications/notifications.module";

@Module({
  imports: [EventEmitterModule, WsModule, NotificationsModule],
  providers: [EventsHandler],
})
export class EventsModule {}
