import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type DeedDocument = Deed & Document;

@Schema()
export class Deed {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;
}

export const DeedSchema = SchemaFactory.createForClass(Deed);
