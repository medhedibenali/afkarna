import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { Reply } from "./entities/reply.entity";
import { RepliesService } from "./replies.service";
@Module({
  imports: [TypeOrmModule.forFeature([Comment, Reply])],
  controllers: [CommentsController],
  providers: [CommentsService, RepliesService],
})
export class CommentsModule {}
