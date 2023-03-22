import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Task } from "../../tasks/schemas/task.schema";

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
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);
