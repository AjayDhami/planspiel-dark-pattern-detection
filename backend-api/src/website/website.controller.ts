import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WebsiteCreateDto } from './dto/website-create.dto';
import { WebsiteService } from './website.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Website')
@ApiBearerAuth()
@Controller('website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Post()
  @UseGuards(AuthGuard)
  async persistWebsiteDetails(@Body() websiteCreateDto: WebsiteCreateDto) {
    return await this.websiteService.persistWebsiteDetails(websiteCreateDto);
  }

  @Get(':websiteId')
  @UseGuards(AuthGuard)
  async fetchParticularWebsiteDetails(@Param('websiteId') websiteId: string) {
    return await this.websiteService.fetchParticularWebsiteDetails(websiteId);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllWebsiteDetailsForParticularUser(@Query('userId') userId: string) {
    const userResponse =
      await this.websiteService.getAllWebsiteDetailsForParticularUser(userId);
    return userResponse;
  }
}
