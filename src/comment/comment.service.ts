import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { CommentRepository } from './comment.repository';
import { Comment} from '../schemas/comment.schema';
@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  async createComment(commentDto: CommentDto) {
    const res =  await this.commentRepository.create(commentDto);
    return res;
  }

  async getPostComments(postId: string): Promise<Comment[]> {
    return await this.commentRepository.findByPostId(postId);
  }


  async deleteComment(id: string, password: string): Promise<any> {
    const comment = await this.commentRepository.findById(id);
    if (comment && comment.password === password) {
      await this.commentRepository.delete(id);
      return { success: true };
    }
    return { success: false, error: '비밀번호가 불일치합니다!!' }; 
  }
  

  async updateComment(id: string, commentDto: CommentDto) {
    const comment = await this.commentRepository.findById(id);
    if (comment && comment.password === commentDto.password) {
      const updateDto = {...commentDto};
      delete updateDto.password;
      await this.commentRepository.update(id, updateDto);
      return { success: true };
    }
    return { success: false, error: '비밀번호가 불일치합니다!!' }; 
  }
}
