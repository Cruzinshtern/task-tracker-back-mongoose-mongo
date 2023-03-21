import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ autoIndex: true })
export class User {
  @Prop({ type: mongoose.Schema.Types.String })
  firstName: string;
  
  @Prop({ type: mongoose.Schema.Types.String })
  lastName: string;
  
  @Prop({ index: true, unique: true, required: true })
  email: string;
  
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
