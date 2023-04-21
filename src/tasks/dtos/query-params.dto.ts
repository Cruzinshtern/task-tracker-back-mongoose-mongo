import { IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";

export class QueryParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number;
  
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;
  
  @IsOptional()
  @Type(() => String)
  @IsString()
  sortField?: string;
  
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  sortDirection?: 1 | -1;
  
  @IsOptional()
  @Type(() => String)
  @IsString()
  filterField?: string;
  
  @IsOptional()
  @Type(() => String)
  @IsString()
  filterValue?: string;
}
