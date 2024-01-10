import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Closet, ClosetDocument} from '../schemas/closet.schema';
import { Injectable } from '@nestjs/common';
import { ClosetDto } from './closet.model';


@Injectable()
export class ClosetMongoRepository {
  constructor(@InjectModel(Closet.name) private closetModel: Model<ClosetDocument>) {}

  async getAllCloset(): Promise<Closet[]> {
    return await this.closetModel.find().exec();
  }

  async createCloset(closetDto: ClosetDto) {
    const createCloset = {
      ...closetDto,
    };
    console.log(createCloset);
    return await this.closetModel.create(createCloset);
  }

  async getWriters() {
    return await this.closetModel.distinct('writer').exec();
  }

  async getClosetByWriter(writer: string): Promise<Closet[]> {
    return await this.closetModel.find({ writer: writer});
  }

  async updateImage(item_id: string, image_path: string): Promise<void> {
    await this.closetModel.updateOne({ _id: item_id }, { actual_img: image_path });
  }
}