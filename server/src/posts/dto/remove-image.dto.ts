import { ApiProperty } from '@nestjs/swagger'

export class RemoveImageDto {
  @ApiProperty({ example: '6846x1db645xd', description: 'Unique post`s number' })
  readonly _id: string

  @ApiProperty({ example: '6846x1db645xd.jpg', description: 'Image name' })
  readonly image: string

  @ApiProperty({ example: '6846x1db645xd', description: 'Folder name' })
  readonly folder: string
}