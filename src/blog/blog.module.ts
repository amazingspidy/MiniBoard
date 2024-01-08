import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogMongoRepository } from './blog.repository';
import { Blog, BlogSchema } from '../schemas/blog.schema';
import { CommentModule } from '../comment/comment.module'; 


@Module({
  controllers: [BlogController],
  imports: [MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]), CommentModule],
  providers: [BlogService, BlogMongoRepository],
  exports: [BlogMongoRepository],
})
export class BlogModule { }
