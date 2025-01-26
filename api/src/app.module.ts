import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { CommonModule } from "./common/common.module";
import { WsModule } from './ws/ws.module';
import { WorkspaceItemModule } from './workspace-item/workspace-item.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { ProfileModule } from "./profile/profile.module";
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',           // Adresse de l'hôte PostgreSQL
      port: 5432,                  // Port de la base de données
      username: 'postgres',        // Nom d'utilisateur PostgreSQL
      password: 'postgres',        // Mot de passe PostgreSQL
      database: 'afkarna_db',      // Nom de la base de données
      autoLoadEntities: true,      // Charge automatiquement toutes les entités
      synchronize: true,           // Synchronise la base de données
    }),
    CommonModule,
    UsersModule,
    AuthModule,
    WsModule,
    WorkspaceItemModule,
    WorkspaceModule,
    ProfileModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
