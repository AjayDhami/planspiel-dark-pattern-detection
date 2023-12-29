import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { WebsitePhaseType } from '../enum/website-phase.enum';

@Schema()
export class Website extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  baseUrl: string;

  @Prop({ required: true })
  websiteName: string;

  @Prop()
  additionalUrls: string[];

  @Prop()
  description: string;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ default: WebsitePhaseType.InProgress, enum: WebsitePhaseType })
  phase: WebsitePhaseType;

  @Prop()
  isDarkPatternFree: boolean;

  @Prop()
  expertIds: string[];

  @Prop()
  primaryExpertId: string;
}

export const WebsiteSchema = SchemaFactory.createForClass(Website);
