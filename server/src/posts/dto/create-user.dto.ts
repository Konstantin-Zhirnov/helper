import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: '6846x1db645xd', description: 'Unique user number' })
  readonly _id?: string;

  @ApiProperty({ example: 'Konstantin', description: 'User`s name' })
  readonly name: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'User`s email' })
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'User`s password' })
  readonly password: string;

  @ApiProperty({ example: '2501111111', description: 'User`s phone number' })
  readonly phone?: string;

  @ApiProperty({ example: '+12501111111', description: 'User`s WhatsApp' })
  whatsapp: string;

  @ApiProperty({ example: '@kostya_zhirnov', description: 'User`s Telegram' })
  telegram: string;

  @ApiProperty({ example: '+12501111111', description: 'User`s Viber' })
  viber: string;

  @ApiProperty({ example: 'https://image.jpg', description: 'User`s photo' })
  readonly photo?: string;

  @ApiProperty({ example: 'true', description: 'The user account is activated' })
  readonly isActivated: boolean;

  @ApiProperty({ example: 'dzvjndd6552sgbsz', description: 'Link to activate the user account' })
  readonly linkForActivated: string;

  @ApiProperty({ example: 'dzvjndd6552sgbsz', description: "Link to change the user's password" })
  readonly changePasswordLink: string;

  @ApiProperty({ example: 'true', description: "Is the subscription paid for" })
  paid: boolean

  @ApiProperty({ example: 'true', description: "Subscription payment time" })
  paidTime: string
}