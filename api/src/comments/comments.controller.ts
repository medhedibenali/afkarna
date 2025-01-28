import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { SearchDto } from "src/common/dto/search.dto";
import { RepliesService } from "./replies.service";
import { CreateReplyDto } from "./dto/create-reply.dto";

@Controller("comments")
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly repliesService: RepliesService,
  ) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll(@Query() searchDto: SearchDto) {
    return this.commentsService.findAll(searchDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.commentsService.remove(id);
  }

  @Post(":id/reply")
  reply(@Param("id") id: string, @Body() createReplyDto: CreateReplyDto) {
    createReplyDto.commentId = id;

    return this.repliesService.create(createReplyDto);
  }
}
