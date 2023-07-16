import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SigninUserDto } from "./dtos/signin-user.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}
  
  @ApiOperation({ summary: 'Login as user' })
  @Post('login')
  async login(@Body() body: SigninUserDto) {
    return await this._authService.login(body);
  }
}
