import { IsEnum, IsArray, ArrayMinSize, ArrayMaxSize, IsNumber } from 'class-validator';
import { Point as IPoint } from 'typeorm';

export class Point implements IPoint {
  @IsEnum(['Point'])
  type: 'Point';

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  coordinates: [number, number];

  constructor(type: 'Point', coordinates: [number, number]) {
    this.type = type;
    this.coordinates = coordinates;
  }
}