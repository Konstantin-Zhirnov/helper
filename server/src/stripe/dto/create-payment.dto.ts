import { ApiProperty } from '@nestjs/swagger'

export class CreatePaymentDto {
  @ApiProperty({ example: '6846x1db645xd', description: 'Unique number' })
  readonly id: string

  @ApiProperty({ example: 3, description: 'Quantity' })
  readonly amount: number
}