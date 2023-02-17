import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  userId: string;
}
