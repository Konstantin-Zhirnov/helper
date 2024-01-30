import { ApiProperty } from '@nestjs/swagger';

export class RemovePostDto {
  @ApiProperty({
    example: '6846x1db645xd',
    description: 'Unique post`s number',
  })
  readonly _id?: string;

  @ApiProperty({
    example: 'title: "My post"',
    description: 'Unique user`s number',
  })
  readonly folder: string;
}
