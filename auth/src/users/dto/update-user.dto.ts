import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: '6846x1db645xd', description: 'Unique user number' })
  readonly userId?: string;

  @ApiProperty({ example: 'name', description: 'Field`s name' })
  readonly fieldName: string;

  @ApiProperty({ example: 'Konstantin', description: 'Field`s value' })
  readonly value: string | boolean;
}
