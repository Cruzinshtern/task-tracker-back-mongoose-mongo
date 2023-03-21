import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}
  
  @Post('login')
  async login(@Body() body: any) {
    return await this._authService.login(body);
  }
}
