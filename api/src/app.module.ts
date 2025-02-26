import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { CommonModule } from "./common/common.module";
import { WsModule } from "./ws/ws.module";
import { WorkspaceItemModule } from "./workspace-item/workspace-item.module";
import { WorkspaceModule } from "./workspace/workspace.module";
import { ProfileModule } from "./profile/profile.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { InvitationsModule } from "./invitations/invitations.module";
import { EventsModule } from "./events/events.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CommonModule,
    UsersModule,
    AuthModule,
    WsModule,
    WorkspaceItemModule,
    WorkspaceModule,
    ProfileModule,
    NotificationsModule,
    EventEmitterModule.forRoot(),
    InvitationsModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
