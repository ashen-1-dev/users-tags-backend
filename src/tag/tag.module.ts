import {forwardRef, Module} from '@nestjs/common';
import { TagController } from './tag.controller';
import {TagService} from "./tag.service";
import {UserModule} from "../user";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Tag} from "./entities/Tag";

const TagRepositoryModule = TypeOrmModule.forFeature([Tag])

@Module({
  controllers: [TagController],
  imports: [
      forwardRef(() => UserModule),
      TagRepositoryModule
  ],
  providers: [TagService],
  exports: [TagService, TagRepositoryModule]
})
export class TagModule {}
