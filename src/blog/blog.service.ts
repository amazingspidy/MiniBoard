import { Injectable } from '@nestjs/common';
import { PostDto } from './blog.model';

//import { BlogFileRepository, BlogRepository } from './blog.repository';
import { BlogMongoRepository } from './blog.repository';
@Injectable()
export class BlogService {
  
  constructor(private blogRepository: BlogMongoRepository) {}

  async getAllPosts() {
    return await this.blogRepository.getAllPost();  //this가 없으면, 이 스코프 내부만을 확인.
  }

  createPost(postDto: PostDto) {
    this.blogRepository.createPost(postDto);
  }

  async getPost(id): Promise<PostDto> {
    return await this.blogRepository.getPost(id);
  }

  async deletePost(id, password: string) {
    const result = await this.blogRepository.deletePost(id, password);
    return result;
  }

  updatePost(id, postDto: PostDto) {
    this.blogRepository.updatePost(id, postDto);
  }

  async checkPassword(id: string, password: string) {
    return this.blogRepository.checkPassword(id, password);
  }
}