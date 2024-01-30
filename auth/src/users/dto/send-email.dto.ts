import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User`s email' })
  readonly email: string;
}
