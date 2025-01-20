import { IsString, IsInt, ValidateNested, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotPastDate } from 'src/shared/decorators/validators/is-not-past-date.decorator';
import { Point } from '../point';

export class CreateEventDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotPastDate()
  date?: number;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => Point)
  point?: Point;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  maxParticipants?: number;
}
