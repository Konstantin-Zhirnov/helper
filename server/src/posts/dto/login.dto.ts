import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({example: 'user@gmail.com', description: "User`s email"})
  readonly email: string;

  @ApiProperty({example: '123456', description: "User`s password"})
  readonly password: string;
}