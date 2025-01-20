import { IsOptional, IsString, IsInt, Min, ValidateNested } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotPastDate } from 'src/shared/decorators/validators/is-not-past-date.decorator';
import { Point } from '../point';

export class UpdateEventDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotPastDate()
  date?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => Point)
  point?: Point;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  maxParticipants?: number;
}
