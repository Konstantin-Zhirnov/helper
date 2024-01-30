import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'szvses1dvs656ssgrb', description: 'password' })
  readonly password: string;

  @ApiProperty({ example: 'szvses1dvs656ssgrb', description: 'link' })
  readonly link: string;
}
