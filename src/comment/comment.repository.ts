import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentRepository {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async findByPostId(postId: string): Promise<Comment[]> {
    return await this.commentModel.find({ postId: postId});
  }

  async findById(id: string): Promise<Comment> {
    return await this.commentModel.findById(id);
  }

  async create(commentDto: CommentDto) {
    const newComment = new this.commentModel({
      ...commentDto,
    });
    const result = await this.commentModel.create(newComment);
    if (result) {
      return { success: true };
    }
    else {
      return { success: false, error: '댓글 업로드 실패' }; 
    }
  }

  async delete(id: string): Promise<any> {
    return await this.commentModel.findByIdAndDelete(id);
  }

  async update(id: string, commentDto: CommentDto){
    const updatedComment = {
      ...commentDto,
    };

    await this.commentModel.findByIdAndUpdate(id, updatedComment, { new: true });
  }
}
