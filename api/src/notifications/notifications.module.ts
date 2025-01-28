import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";
import { UsersModule } from "src/users/users.module";
import { WorkspaceModule } from "src/workspace/workspace.module";
import { Notification } from "./entities/notification.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trigger } from "./entities/trigger.entity";

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [
    TypeOrmModule.forFeature([Notification, Trigger]),
    UsersModule,
    WorkspaceModule,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
