import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument} from '../schemas/blog.schema';
import { Injectable } from '@nestjs/common';
import { readFile, writeFile} from 'fs/promises';
import { PostDto } from './blog.model';

export interface BlogRepository {
  getAllPost(): Promise<PostDto[]>;
  createPost(postDto: PostDto);
  getPost(id: String): Promise<PostDto>;
  deletePost(id: String, password: string): any;
  updatePost(id: String, postDto: PostDto);
}

//몽고디비 레포지토리
@Injectable()
export class BlogMongoRepository implements BlogRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}  

  async getAllPost(): Promise<Blog[]> {
    return await this.blogModel.find().exec();  
  }

  async createPost(postDto: PostDto) {
    const createPost = {
      ...postDto,
      createDt: new Date(),
      updateDt: new Date(),
    };
    this.blogModel.create(createPost);
  }

  async getPost(id: string): Promise<PostDto> {
    return await this.blogModel.findById(id);
  }

  async deletePost(id: string, password: string) {
    const blog = await this.blogModel.findById(id);
    if (blog.password !== password ) {
      //throw new Error('Invalid PW!');
      console.log("wrong pw!");
      return { success: false, message: 'Invalid PW!' };
    }
    await this.blogModel.findByIdAndDelete(id);
    return { success: true };
  }

  async updatePost(id: string, postDto: PostDto) {
    
    const updatePost = { id, ...postDto, updatedDt: new Date() };
    
    await this.blogModel.findByIdAndUpdate(id, updatePost);
  }

  async checkPassword(id: string, password: string) {
    const post = await this.blogModel.findById(id);
    return post.password === password;
  }
}



// @Injectable()
// export class BlogFileRepository implements BlogRepository {  // implements (인터페이스) -> 인터페이스의 구조 따라야함.
//   FILE_NAME = './src/blog.data.json';

//   async getAllPost(): Promise<PostDto[]> {
//     const datas = await readFile(this.FILE_NAME, 'utf8');
//     const posts = JSON.parse(datas);
//     return posts;
//   }

//   async createPost(postDto: PostDto) {
//     const posts = await this.getAllPost();
//     const id = posts.length + 1;
//     const createPost = { id: id.toString(), ...postDto, createdDt: new Date() };
//     posts.push(createPost);
//     await writeFile(this.FILE_NAME, JSON.stringify(posts));
//   }

//   async getPost(id: string): Promise<PostDto> {
//     const posts = await this.getAllPost();
//     const result = posts.find((post) => post.id === id);
//     return result;
//   }

//   async deletePost(id: string) {
//     const posts = await this.getAllPost();
//     const filteredPosts = posts.filter((post) => post.id !== id);
//     await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
//   }

//   async updatePost(id: string, postDto: PostDto) {
//     const posts = await this.getAllPost();
//     const index = posts.findIndex((post) => post.id === id);
//     const updatePost = { id, ...postDto, updatedDt: new Date() };
//     posts[index] = updatePost;
//     await writeFile(this.FILE_NAME, JSON.stringify(posts));
//   }
// }