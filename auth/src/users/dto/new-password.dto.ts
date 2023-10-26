import { ApiProperty } from "@nestjs/swagger";

export class NewPasswordDto {
  @ApiProperty({ example: '6846x1db645xd', description: 'Unique user number' })
  readonly _id?: string;

  @ApiProperty({example: '123456', description: "User`s password"})
  readonly password: string;
}