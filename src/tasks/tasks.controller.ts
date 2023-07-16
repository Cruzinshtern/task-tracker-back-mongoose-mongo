import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { Task } from "./schemas/task.schema";
import { UpdateTaskDto } from "./dtos/update-task.dto";
import { QueryParams } from "./dtos/query-params.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private _tasksService: TasksService) {}
  
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({ status: 200, type: Task })
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async create(@Req() req: any, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this._tasksService.create(req, createTaskDto);
  }
  
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, type: [Task] })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@Req() req: any, @Query() { limit, page, sortField, sortDirection, filterField, filterValue }: QueryParams): Promise<{ data: Task, count: number }> {
    return await this._tasksService.getAll(req, limit, page, sortField, sortDirection, filterField, filterValue);
  }
  
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [Task] })
  @ApiOperation({ summary: 'Get all tasks by date' })
  @Get('/findAllByDate')
  @UseGuards(JwtAuthGuard)
  async getAllByDate(@Req() req: any, @Query() query: { startDate: string }): Promise<Task[]> {
    return await this._tasksService.getAllByDate(req, query.startDate);
  }
  
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Task })
  @ApiOperation({ summary: 'Get one task by id' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id') id: string) {
    return this._tasksService.getOneById(id);
  }
  
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({ status: 200, type: Task })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this._tasksService.update(body);
  }
}
