import { ApiProperty } from '@nestjs/swagger'

export class CreatePostDto {
  @ApiProperty({ example: '6846x1db645xd', description: 'Unique post`s number' })
  readonly _id?: string

  @ApiProperty({ example: 'I wll help with the yard cleaning', description: 'Post`s name' })
  readonly title: string

  @ApiProperty({ example: 'Health & Wellness', description: 'Post`s category' })
  readonly category: string

  @ApiProperty({
    example: 'I have many years of experience in cleaning household plots',
    description: 'Post`s description',
  })
  readonly description: string

  @ApiProperty({ example: 'Nanaimo', description: 'Place for help' })
  readonly location: string

  @ApiProperty({ example: '6846x1db645xd', description: 'Unique user`s number' })
  readonly authorId: string
}