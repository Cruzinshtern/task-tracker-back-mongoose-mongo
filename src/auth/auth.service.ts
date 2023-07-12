import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { SigninUserDto } from "./dtos/signin-user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private _userService: UsersService, private _jwtService: JwtService) {}
  
  async login(userDto: SigninUserDto): Promise<{token: string}> {
    const user = await this.validateUser(userDto);
    return await this.generateToken(user);
  }
  
  private async validateUser(userDto: SigninUserDto) {
    const user = await this._userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Wrong email or password' })
  }
  
  private async generateToken(user: any): Promise<{token: string}> {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };
    return { token: this._jwtService.sign(payload) }
  }
}
