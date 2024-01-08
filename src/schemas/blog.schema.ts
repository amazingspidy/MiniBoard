import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UrlWithStringQuery } from 'url';


export type BlogDocument = Blog & Document; //블로그이면서, 도큐멘트



@Schema()
export class Blog {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  createdDt: Date;

  @Prop()
  updatedDt: Date;

}

//스키마 생성.
export const BlogSchema = SchemaFactory.createForClass(Blog);  