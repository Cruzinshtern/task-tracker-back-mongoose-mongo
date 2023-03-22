import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Query, QueryWithHelpers } from "mongoose";
import { Task, TaskDocument } from "./schemas/task.schema";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-task.dto";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private _taskModel: Model<TaskDocument>) {}
  
  async create(req: any, createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const user = req.user;
      const newTask = { ...createTaskDto, createdBy: user.id, createdAt: new Date(), updatedAt: new Date() };
      return await this._taskModel.create(newTask);
    } catch (err) {
      return err;
    }
  }
  
  async getAll(req: any): Promise<Task[]> {
    try {
      return await this._taskModel.find().where('createdBy', req.user.id).exec();
    } catch (err) {
      return err;
    }
  }
  
  update(task: UpdateTaskDto): Query<Task, any> {
    try {
      return this._taskModel.findByIdAndUpdate(task._id, { ...task, updatedAt: new Date() }, { new: true });
    } catch (err) {
      return err;
    }
  }

  getOneById(id: string): QueryWithHelpers<TaskDocument, any> {
    try {
      return this._taskModel.findOne({ _id: id });
    } catch (err) {
      return err;
    }
  }
}
