import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CommentCreateDto {
  websiteId: string;

  patternId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Comment content is required' })
  expertId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Comment content is required' })
  content: string;
}
