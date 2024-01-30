import { ApiProperty } from '@nestjs/swagger';

export class AddImagesDto {
  @ApiProperty({
    example: '6846x1db645xd',
    description: 'Unique post`s number',
  })
  readonly _id?: string;
}
