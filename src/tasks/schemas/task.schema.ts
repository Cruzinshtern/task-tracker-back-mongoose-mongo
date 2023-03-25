import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../users/schemas/user.schema";
import { TaskStatus } from "../../shared/enums/task-status.enum";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  title: string;
  
  @Prop({ type: mongoose.Schema.Types.String })
  description: string;
  
  @Prop({ type: mongoose.Schema.Types.Number, enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;
  
  @Prop({ type: mongoose.Schema.Types.String })
  createdAt: string;
  
  @Prop({ type: mongoose.Schema.Types.String })
  updatedAt: string;
  
  @Prop({ type: mongoose.Schema.Types.String })
  startDate: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
