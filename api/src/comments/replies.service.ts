import { Injectable } from "@nestjs/common";
import { CrudService } from "src/common/crud/crud.service";
import { Reply } from "./entities/reply.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RepliesService extends CrudService<Reply> {
  constructor(
    @InjectRepository(Reply)
    repliesRepository: Repository<Reply>,
  ) {
    super(repliesRepository);
  }
}
