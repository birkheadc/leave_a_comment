import { Injectable } from "@nestjs/common";
import { InjectableConfig } from "../config/injectableConfig";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CommentsConfig extends InjectableConfig {
  region: string;
  tableName: string;
  constructor(configService: ConfigService) {
    super(configService, 'comments')
  }
}