import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Task } from "../../tasks/schemas/task.schema";
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = HydratedDocument<User>;

@Schema({ autoIndex: true })
export class User {
  @ApiProperty({ example: 'First name', description: 'First name of the user' })
  @Prop({ type: mongoose.Schema.Types.String })
  firstName: string;
  
  @ApiProperty({ example: 'Last name', description: 'Last name of the user' })
  @Prop({ type: mongoose.Schema.Types.String })
  lastName: string;
  
  @ApiProperty({ example: 'example@gmail.com', description: 'User\'s email' })
  @Prop({ index: true, unique: true, required: true })
  email: string;
  
  @ApiProperty({ example: '123456', description: 'User\'s password' })
  @Prop({ required: true })
  password: string;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);
