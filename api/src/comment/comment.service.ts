import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentGateway } from "./comment.gateway";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly commentGateway: CommentGateway
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create(createCommentDto);
    const savedComment = await this.commentRepository.save(comment);
    this.commentGateway.emitCommentCreated(savedComment);
    return savedComment;
  }

  async reactions(commentId: string): Promise<Record<string, number>> {
    const comment = await this.commentRepository.findOne({ where: { id: commentId } });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${commentId} not found`);
    }
    return comment.getReactionCounts();
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ["user", "replies", "workspace"] });
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ["user", "replies", "workspace"] });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.preload({
      id,
      ...updateCommentDto,
    });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    const updatedComment = await this.commentRepository.save(comment);
    this.commentGateway.emitCommentUpdated(updatedComment);
    return updatedComment;
  }

  async remove(id: string): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    await this.commentRepository.remove(comment);
    //this.commentGateway.emitCommentDeleted(id);
  }
}