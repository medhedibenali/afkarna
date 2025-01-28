import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { CrudService } from "src/common/crud/crud.service";

@Injectable()
export class CommentsService extends CrudService<Comment> {
  constructor(
    @InjectRepository(Comment)
    commentRepository: Repository<Comment>,
  ) {
    super(commentRepository);
  }
}
