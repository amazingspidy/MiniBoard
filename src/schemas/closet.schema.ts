import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClosetDocument = Closet & Document;

@Schema()
export class Closet {
  @Prop()
  id: string;

  @Prop()
  writer: string;
  
  @Prop()
  item_name: string;

  @Prop()
  point: string;

  @Prop()
  spec: string;

  @Prop()
  actual_img: string;

  @Prop()
  product_img: string;
}

export const ClosetSchema = SchemaFactory.createForClass(Closet);