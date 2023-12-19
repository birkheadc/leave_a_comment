import { randomUUID } from "crypto";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { AttributeValue } from "@aws-sdk/client-dynamodb";

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

  static fromDynamoDBObject(data: any): Comment {
    const comment: Comment = new Comment();

    comment.id = data.id.S ?? "";
    comment.site = data.site.S ?? "";
    comment.name = data.name.S ?? "";
    comment.body = data.body.S ?? "";
    comment.date = data.date.N ?? 0;

    return comment;
  }

  toItemObject(): Record<string, AttributeValue> {
    const itemObject: Record<string, AttributeValue> = {
      id: {
        S: this.id
      },
      site: {
        S: this.site
      },
      name: {
        S: this.name
      },
      body: {
        S: this.body
      },
      date: {
        N: this.date.toString()
      }
    }

    return itemObject;
  }
}
