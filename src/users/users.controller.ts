import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private _usersService: UsersService) {
  }
  
  @Post()
  async create(@Body() body: any) {
    return await this._usersService.create(body);
  }
}
