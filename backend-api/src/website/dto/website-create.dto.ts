import { IsNotEmpty } from 'class-validator';

export class WebsiteCreateDto {
  @IsNotEmpty({ message: 'User id is required' })
  userId: string;

  @IsNotEmpty({ message: 'Base url is required' })
  baseUrl: string;

  @IsNotEmpty({ message: 'Website Name is required' })
  websiteName: string;

  additionalUrls: string[];

  description: string;
}
