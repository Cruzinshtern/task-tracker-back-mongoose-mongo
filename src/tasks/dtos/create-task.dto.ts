import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
  @ApiProperty({ example: 'My title', description: 'Title of the task' })
  @IsString({ message: 'Has to have a title' })
  readonly title: string;
  
  @ApiProperty({ example: 'My description', description: 'Description of the task' })
  @IsString()
  readonly description?: string;
  
  @ApiProperty({ example: '2023-05-21', description: 'Date of the task\'s creation date' })
  @IsString()
  readonly startDate: string;
}
