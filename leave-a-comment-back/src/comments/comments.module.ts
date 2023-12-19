import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { CommentsConfig } from './comments.config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, CommentsConfig, {
    provide: DynamoDBClient,
    inject: [CommentsConfig],
    useFactory: (config: CommentsConfig) => {
      return new DynamoDBClient(config.region);
    }
  }],
  imports: [ AuthModule ]
})
export class CommentsModule {}
