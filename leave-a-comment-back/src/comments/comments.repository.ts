import { Injectable } from "@nestjs/common";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentsRepository {

  comment1: Comment = {
    id: "9ee9d696-7c48-41fb-9f31-06463019e821",
    site: "birkheadc.me",
    name: "Colby",
    body: "This is a comment from Colby. It is not long enough to test my formatting.",
    date: Date.now()
  };
  comment2: Comment = {
    id: "8a698235-29dd-4717-98d3-e8511f289142",
    site: "birkheadc.me",
    name: "Jacob",
    body: "This is a mean comment from a mean person. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting. It is long enough to test my formatting.",
    date: Date.now()
  }

  mockData: Comment[] = [
    this.comment1,
    this.comment2
  ];

  async add(comment: Comment) {
    this.mockData.push(comment);
  }

  async delete(id: string) {
    this.mockData = this.mockData.filter(c => c.id !== id);
  }

  async getAll() {
    return this.mockData;
  }
}