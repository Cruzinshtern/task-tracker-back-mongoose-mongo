import { IsString } from "class-validator";

export class CreateTaskDto {
  @IsString({ message: 'Has to have a title' })
  readonly title: string;
  
  @IsString()
  readonly description?: string;
  
  @IsString()
  readonly startDate: string;
}
