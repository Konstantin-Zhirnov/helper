import { ApiProperty } from '@nestjs/swagger'

export class RemoveReviewDto {
  @ApiProperty({ example: '6846x1db645xd', description: 'Unique post`s number' })
  readonly _id?: string

  @ApiProperty({ example: '6846x1db645xd', description: 'Unique user`s number' })
  readonly folder: string
}