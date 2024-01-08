import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment, CommentSchema } from '../schemas/comment.schema'
import { CommentRepository } from './comment.repository';
import { cp } from 'fs';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  providers: [CommentService, CommentRepository],
  controllers: [CommentController],
  exports: [CommentService, CommentRepository]
})
export class CommentModule { }
