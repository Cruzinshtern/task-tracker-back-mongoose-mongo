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
  
  async getAll(req: any, limit: number, page: number, sortField: string, sortDirection: 1 | -1, filterField: string, filterValue: string): Promise<any> {
    try {
      //Define sorting criteria
      let sortObj = {};
      sortObj[sortField] = sortDirection;
      //Define filtering criteria
      let filterObj = {};
      filterObj[filterField] = new RegExp(filterValue);
      
      const tasks = await this._getAllTodosByUser(req.user.id)
        .where((filterField && filterValue) ? filterObj : {})
        .sort((sortField && sortDirection) ? sortObj : { "_id": 1 })
        .limit(limit)
        .skip(limit * (page - 1))
        .exec();
      const allTasksCount = await this._taskModel.countDocuments({}).exec();
      return {
        data: tasks,
        count: allTasksCount
      };
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
  
  private _getAllTodosByUser(id: string): Query<any, any> {
    return this._taskModel.find().where('createdBy', id);
  }
}
