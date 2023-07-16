import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../users/schemas/user.schema";
import { TaskStatus } from "../../shared/enums/task-status.enum";
import { ApiProperty } from "@nestjs/swagger";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @ApiProperty({ example: 'My title', description: 'Title of the task' })
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  title: string;
  
  @ApiProperty({ example: 'Title\'s description', description: 'Description of the task' })
  @Prop({ type: mongoose.Schema.Types.String })
  description: string;
  
  @ApiProperty({ example: 'Title\'s status', description: 'Status of the task' })
  @Prop({ type: mongoose.Schema.Types.Number, enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;
  
  @ApiProperty({ example: 'Date', description: 'Date of the task\'s creation date' })
  @Prop({ type: mongoose.Schema.Types.String })
  createdAt: string;
  
  @ApiProperty({ example: 'Date', description: 'Date of the task\'s update date' })
  @Prop({ type: mongoose.Schema.Types.String })
  updatedAt: string;
  
  @ApiProperty({ example: 'Date', description: 'Date of the task\'s start date' })
  @Prop({ type: mongoose.Schema.Types.String })
  startDate: string;
  
  @ApiProperty({ example: 'hello', description: 'Person who created the task' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
