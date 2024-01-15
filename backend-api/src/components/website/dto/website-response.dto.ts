import { WebsitePhaseType } from '../enum/website-phase.enum';

export class WebsiteResponseDto {
  websiteId: string;
  baseUrl: string;
  websiteName: string;
  userId: string;
  additionalUrls: string[];
  description: string;
  isCompleted: boolean;
  phase: WebsitePhaseType;
  isDarkPatternFree: boolean;
  expertFeedback: string;
  expertIds: string[];
  expertDetails: ExpertDetailsDto[];
  primaryExpertId: string;
  primaryExpertName: string;
}

export class ExpertDetailsDto {
  id: string;
  name: string;
}
