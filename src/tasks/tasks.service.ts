import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Query, QueryWithHelpers } from "mongoose";
import { Task, TaskDocument } from "./schemas/task.schema";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-task.dto";
import { format } from "date-fns";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private _taskModel: Model<TaskDocument>) {}
  
  async create(req: any, createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const user = req.user;
      const newTask = {
        ...createTaskDto,
        createdBy: user.id,
        createdAt: format(new Date(), 'yyyy-MM-dd'),
        updatedAt: format(new Date(), 'yyyy-MM-dd'),
        startDate: createTaskDto.startDate,
      };
      return await this._taskModel.create(newTask);
    } catch (err) {
      return err;
    }
  }
  
  async getAll(req: any): Promise<Task[]> {
    try {
      return await this._getAllTodosByUser(req.user.id).exec();
    } catch (err) {
      return err;
    }
  }
  
  async getAllByDate(req: any, date: string): Promise<Task[]> {
    try {
      return await this._getAllTodosByUser(req.user.id).where('startDate', date).exec();
    } catch (err) {
      return err;
    }
  }
  
  update(task: UpdateTaskDto): Query<Task, any> {
    try {
      return this._taskModel.findByIdAndUpdate(task._id, { ...task, updatedAt: format(new Date(), 'yyyy-MM-dd') }, { new: true });
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
  
  private _getAllTodosByUser(id: string) {
    return this._taskModel.find().where('createdBy', id);
  }
}
