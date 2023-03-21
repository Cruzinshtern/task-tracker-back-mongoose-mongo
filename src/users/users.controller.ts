import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller('users')
export class UsersController {
  constructor(private _usersService: UsersService) {
  }
  
  @Post()
  async create(@Body() body: CreateUserDto) {
    try {
      return await this._usersService.create(body);
    } catch (err){
      return err;
    }
  }
  
  @Get()
  async getUserByEmail(@Body() body: any) {
    return await this._usersService.getUserByEmail(body);
  }
}
