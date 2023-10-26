import { ApiProperty } from "@nestjs/swagger";

export class ConfirmDto {
  @ApiProperty({example: 'szvses1dvs656ssgrb', description: "link"})
  readonly link: string;
}