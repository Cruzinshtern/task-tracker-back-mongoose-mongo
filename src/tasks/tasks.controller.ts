import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { Task } from "./schemas/task.schema";
import { UpdateTaskDto } from "./dtos/update-task.dto";
import { QueryParams } from "./dtos/query-params.dto";

@Controller('tasks')
export class TasksController {
  constructor(private _tasksService: TasksService) {}
  
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async create(@Req() req: any, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this._tasksService.create(req, createTaskDto);
  }
  
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@Req() req: any, @Query() { limit, page, sortField, sortDirection, filterField, filterValue }: QueryParams): Promise<Task[]> {
    return await this._tasksService.getAll(req, limit, page, sortField, sortDirection, filterField, filterValue);
  }
  
  @Get('/findAllByDate')
  @UseGuards(JwtAuthGuard)
  async getAllByDate(@Req() req: any, @Query() query: { startDate: string }): Promise<Task[]> {
    return await this._tasksService.getAllByDate(req, query.startDate);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id') id: string) {
    return this._tasksService.getOneById(id);
  }
  
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this._tasksService.update(body);
  }
}
