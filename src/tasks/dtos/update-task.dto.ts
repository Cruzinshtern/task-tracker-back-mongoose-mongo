import { IsString } from "class-validator";

export class UpdateTaskDto {
  @IsString()
  readonly _id: string;
  
  @IsString({ message: 'Has to have a title' })
  readonly title: string;
  
  @IsString()
  readonly description?: string;
}
