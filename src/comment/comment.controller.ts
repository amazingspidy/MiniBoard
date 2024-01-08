import { Controller, Get, Post, Delete, Put, Body, Param, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  
  @Post()
  async createComment(@Body() commentDto: CommentDto) {
    const res = await this.commentService.createComment(commentDto);
    console.log(res);
    return res;
  }

  @Get('/:postId')
  async getPostComments(@Param('postId') postId: string) {
    return await this.commentService.getPostComments(postId);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string, @Body('password') password: string): Promise<void> {
    const result = await this.commentService.deleteComment(id, password);
    return result;
    
  }

  @Put(':id')
  async updateComment(@Param('id') id: string, @Body() commentDto: CommentDto) {
    return this.commentService.updateComment(id, commentDto);
  }

}