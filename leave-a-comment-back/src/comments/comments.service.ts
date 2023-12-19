import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsRepository } from './comments.repository';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(private readonly repository: CommentsRepository) {

  }
  async create(createCommentDto: CreateCommentDto) {
    await this.repository.add(Comment.fromCreateCommentDto(createCommentDto));
  }

  async findAll() {
    return await this.repository.getAll();
  }

  async remove(id: string) {
    await this.repository.delete(id);
  }
}
