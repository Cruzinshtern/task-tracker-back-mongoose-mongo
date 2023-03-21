import { IsEmail, IsString, Length } from "class-validator";

export class SigninUserDto {
  @IsString({ message: 'Has to be a string' })
  @IsEmail({}, { message: 'Email format is incorrect' })
  readonly email: string;
  
  @IsString({ message: 'Has to be a string' })
  @Length(4, 16, { message: 'Password needs to be more then 4 and less then 16 symbols long' })
  readonly password: string;
}
