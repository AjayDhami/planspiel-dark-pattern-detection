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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { UserType } from 'src/components/user/enum/user-type.enum';

@ApiTags('Website')
@ApiBearerAuth()
@Controller('website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(UserType.Client)
  @ApiOperation({
    summary: 'Create a new website',
    description: 'Persist details of a new website for a user.',
  })
  async persistWebsiteDetails(@Body() websiteCreateDto: WebsiteCreateDto) {
    return await this.websiteService.persistWebsiteDetails(websiteCreateDto);
  }

  @Get(':websiteId')
  @UseGuards(AuthGuard)
  @Roles(UserType.Client)
  @ApiOperation({
    summary: 'Fetch details of a website',
    description: 'Retrieve details of a specific website based on its ID.',
  })
  async fetchParticularWebsiteDetails(@Param('websiteId') websiteId: string) {
    return await this.websiteService.fetchParticularWebsiteDetails(websiteId);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles(UserType.Client)
  @ApiOperation({
    summary: 'Get all websites for a user',
    description:
      'Retrieve details of all websites associated with a specific user.',
  })
  async getAllWebsiteDetailsForParticularUser(@Query('userId') userId: string) {
    return await this.websiteService.getAllWebsiteDetailsForParticularUser(
      userId,
    );
  }
}
