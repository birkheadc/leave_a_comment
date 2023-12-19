import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Comment } from "./entities/comment.entity";
import { AttributeValue, DeleteItemCommand, DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { CommentsConfig } from "./comments.config";

@Injectable()
export class CommentsRepository {

  constructor(private readonly client: DynamoDBClient, private readonly config: CommentsConfig) { }

  async add(comment: Comment) {
    const itemObject: Record<string, AttributeValue> = comment.toItemObject();

    const command = new PutItemCommand({
      TableName: this.config.tableName,
      Item: itemObject
    });

    try {
      await this.client.send(command);
    } catch (error) {
      console.log('Error while performing add: ', error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    const command = new DeleteItemCommand({
      TableName: this.config.tableName,
      Key: {
        id: {
          S: id
        }
      },
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_OLD'
    });

    try {
      const result = await this.client.send(command);
      if (result.Attributes == null) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
    } catch (error) {
      console.log('Error while performing delete: ', error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAll() {
    const comments: Comment[] = [];

    const command = new ScanCommand({
      TableName: this.config.tableName
    });

    try {
      const response = await this.client.send(command);
      if (response.Items) {
        response.Items.forEach(item => {
          comments.push(Comment.fromDynamoDBObject(item));
        })
      }
    } catch (error) {
      console.log('Error while performing getAll: ', error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return comments;
  }
}