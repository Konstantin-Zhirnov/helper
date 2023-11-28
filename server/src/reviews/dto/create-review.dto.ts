import { ApiProperty } from '@nestjs/swagger'


export class CreateReviewDto {
  @ApiProperty({ example: '6846x1db645xd', description: 'Unique post`s number' })
  readonly _id?: string

  @ApiProperty({ example: 'Excellent specialist', description: 'Review`s title' })
  readonly title: string

  @ApiProperty({
    example: 'I am very pleased with the work done by this person. I recommend everyone to contact him.',
    description: 'Review`s description',
  })
  readonly description: string

  @ApiProperty({ example: 4, description: 'Number of stars' })
  readonly stars: number

  @ApiProperty({ example: '6846x1db645xd', description: 'The unique number of the user that the review is about' })
  readonly userId: string

  @ApiProperty({ example: '6846x1db645xd', description: 'The unique number of the user who leaves a review' })
  readonly authorId: string
}
