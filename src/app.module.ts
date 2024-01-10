import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './home/home.module';
import { BlogModule } from './blog/blog.module';
import { Blog, BlogSchema } from './schemas/blog.schema';
import { join } from 'path';
import { CommentModule } from './comment/comment.module';
import { CommentSchema, Comment } from './schemas/comment.schema';
import { ClosetModule } from './closet/closet.module';

import * as hbs from 'hbs';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'nest-auth-test.sqlite',
      entities: [User],  //엔티티 객체 넣기. 
      synchronize: true,
      logging: true,
    }),

    MongooseModule.forRoot(
      'mongodb+srv://2018ds21112:dh700328!!@cluster0.7y4lhxj.mongodb.net/blog', 
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'nest-auth-test', 'uploads'),
      serveRoot: '/uploads',
    }),
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    HomeModule,
    BlogModule,
    CommentModule,
    ClosetModule,  //env설정을 읽어오도록 설정함.
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
