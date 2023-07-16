import { IsEmail, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'First name', description: 'First name of a user' })
  @IsString({ message: 'Has to be a string' })
  readonly firstName: string;
  
  @ApiProperty({ example: 'Last name', description: 'Last name of a user' })
  @IsString({ message: 'Has to be a string' })
  readonly lastName: string;
  
  @ApiProperty({ example: 'example@gmail.com', description: 'Email of a user' })
  @IsString({ message: 'Has to be a string' })
  @IsEmail({}, { message: "Email format is incorrect" })
  readonly email: string;
  
  @ApiProperty({ example: '123456', description: 'Password of a user' })
  @IsString({ message: 'Has to be a string' })
  @Length(4, 16, { message: 'Password needs to be more then 4 and less then 16 symbols long' })
  readonly password: string;
}
