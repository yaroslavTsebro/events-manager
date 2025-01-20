import { ApiProperty } from '@nestjs/swagger';

export class PagedData<T> {
  @ApiProperty({ description: 'Array of items', isArray: true })
  data: T[];

  @ApiProperty({ description: 'Total number of items', example: 50 })
  total: number;

  @ApiProperty({ description: 'Current page number', example: 1 })
  page: number;

  @ApiProperty({ description: 'Number of items per page', example: 10 })
  limit: number;
}


export class PaginationQueryDto {
  @ApiProperty({ type: 'integer', example: 1, description: 'Page number' })
  page: number = 1;

  @ApiProperty({ type: 'integer', example: 10, description: 'Number of items per page' })
  limit: number = 10;
}
