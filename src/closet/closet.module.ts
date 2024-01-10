import { Module } from '@nestjs/common';
import { ClosetController } from './closet.controller';
import { ClosetService } from './closet.service';
import { ClosetMongoRepository } from './closet.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Closet, ClosetSchema } from 'src/schemas/closet.schema';
import { BlogMongoRepository } from 'src/blog/blog.repository';

@Module({
  controllers: [ClosetController],
  imports: [MongooseModule.forFeature([{ name: Closet.name, schema: ClosetSchema}])],
  providers: [ClosetService, ClosetMongoRepository],
  exports: [ClosetMongoRepository, ClosetService],
})
export class ClosetModule {}
