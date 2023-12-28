import { ReplyResponseDto } from './reply-response.dto';

export class CommentResponseDto {
  websiteId: string;
  patternId: string;
  expertId: string;
  expertName: string;
  content: string;
  replies: ReplyResponseDto[];
}
