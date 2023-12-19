import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    await this.commentsService.create(createCommentDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.commentsService.findAll();
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    await this.commentsService.remove(id);
  }

  @Get('ping')
  ping() {
    return "Ping successful.";
  }
}
