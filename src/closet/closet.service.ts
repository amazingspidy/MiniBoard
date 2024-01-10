import { Injectable } from '@nestjs/common';
import {ClosetDto} from './closet.model';
import { ClosetMongoRepository } from './closet.repository';
@Injectable()
export class ClosetService {
  
  constructor(private closetRepository: ClosetMongoRepository) {}

  async getAllCloset() {
    return await this.closetRepository.getAllCloset();
  }

  createCloset(closetDto: ClosetDto) {
    this.closetRepository.createCloset(closetDto);
  }

  async getWriters() {
    return await this.closetRepository.getWriters();
  }

  async getClosetByWriter(writer: string) {
    return this.closetRepository.getClosetByWriter(writer);
  }

  async updateImage(item_id: string, image_path: string): Promise<void> {
    await this.closetRepository.updateImage(item_id, image_path);
  }
}
