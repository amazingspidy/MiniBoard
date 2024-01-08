import { Controller, Param, Body, Delete, Get, Post, Put, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { BlogService } from './blog.service';
import { CommentService } from '../comment/comment.service';

@Controller('blog')  // {서버주소}/blog 이하의 요청을 처리한다.
export class BlogController {

  constructor(
    private blogService: BlogService,
    private commentService: CommentService,
    
    ) { }

  @Get()
  @Render('blog')
  async getAllPosts() {
    console.log('모든 게시글 가져오기');
    const posts = await this.blogService.getAllPosts();
    return { posts };
  }

  @Post()
  createPost(@Body() postDto, @Res() res: Response) { // http 요청의 body부분을 post에 할당함.
    console.log('게시글 작성');
    this.blogService.createPost(postDto);
    res.redirect('/blog');
    return;
  }


  @Get('/:id')
  @Render('post')
  async getPost(@Param('id') id: string) {  //Param-> URL param의 값을 할당.
    console.log('게시글 하나 가져오기');
    const post = await this.blogService.getPost(id);
    console.log(post);

    console.log('게시글의 댓글들 가져오기');
    const comments = await this.commentService.getPostComments(id);
    console.log(comments);

    return { 
      post: post ,
      comments: comments
    };  // 'post'라는 키로 객체를 래핑

  }

  
  @Get('/:id/edit')
  @Render('edit')
  async getEditPage(@Param('id') id: string) {
    const post = await this.blogService.getPost(id);
    return { post };
  }


  
  @Delete('/:id')
  async deletePost(@Param('id') id: string, @Body('password') password: string, @Res() res) { // 'res' 파라미터 추가
    console.log('게시글 삭제');
    const result = await this.blogService.deletePost(id, password);
    //res.redirect('/blog'); // 리다이렉트: 블로그 메인 페이지로
    console.log(result);
    res.json(result);
  }

  

  @Put('/:id')
    async updatePost(@Param('id') id: string, @Body() postDto, @Res() res) { // 'res' 파라미터 추가
    console.log('게시글 업데이트', id, postDto);
    await this.blogService.updatePost(id, postDto); // 'await' 추가: updatePost 메서드가 완료될 때까지 기다림
    res.redirect(`/blog/${id}`); // 리다이렉트: 게시글 페이지로
  }

  @Post('/:id/check-password')
  async checkPassword(@Param('id') id: string, @Body('password') password: string) {
    const isValid = await this.blogService.checkPassword(id, password);
    return { success: isValid };
  }

}