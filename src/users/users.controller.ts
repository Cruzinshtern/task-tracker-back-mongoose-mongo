import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./schemas/user.schema";

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private _usersService: UsersService) {
  }
  
  @ApiOperation({ summary: 'Create user or register' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    try {
      return await this._usersService.create(body);
    } catch (err){
      return err;
    }
  }
  
  @ApiOperation({ summary: 'Get user by email' })
  @Get()
  getUserByEmail(@Body() body: any) {
    return this._usersService.getUserByEmail(body.email);
  }
}
