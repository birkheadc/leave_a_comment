import { randomUUID } from "crypto";
import { CreateCommentDto } from "../dto/create-comment.dto";

export class Comment {
  id: string;
  site: string;
  name: string;
  body: string;
  date: number;

  static fromCreateCommentDto(dto: CreateCommentDto): Comment {
    const comment = new Comment();

    comment.id = randomUUID();
    comment.site = dto.site;
    comment.name = dto.name;
    comment.body = dto.body;
    comment.date = Date.now();

    return comment;
  }
}
