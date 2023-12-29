import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WebsiteCreateDto } from './dto/website-create.dto';
import { WebsiteService } from './website.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { UserType } from 'src/components/user/enum/user-type.enum';
import { PatternCreateDto } from './dto/pattern-create.dto';
import { CommentCreateDto } from './dto/comment-create.dto';
import { ReplyCreateDto } from './dto/reply-create.dto';
import { AssignExpertsDto } from './dto/assign-experts.dto';
import { UpdatePatternPhase } from './dto/update-pattern-phase.dto';
import { PublishCertificationDto } from './dto/publish-certification.dto';

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

  @Put(':websiteId/assignExperts')
  @UseGuards(AuthGuard)
  @Roles(UserType.SuperAdmin)
  @ApiOperation({
    summary: 'Assign experts to website',
  })
  async assignExperts(
    @Param('websiteId') websiteId: string,
    @Body() assignExpertsDto: AssignExpertsDto,
  ) {
    return await this.websiteService.assignExpertsToWebsite(
      websiteId,
      assignExpertsDto,
    );
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
      'Retrieve details of all websites associated with a specific user(Client or Expert).',
  })
  async getAllWebsiteDetailsForParticularUser(@Query('userId') userId: string) {
    return await this.websiteService.getAllWebsiteDetailsForParticularUser(
      userId,
    );
  }

  @Get(':userType/details')
  @UseGuards(AuthGuard)
  @Roles(UserType.SuperAdmin)
  @ApiOperation({
    summary: 'Get websites details associated with clients',
    description: 'Retrieve details of all websites associated with clients',
  })
  async getAllWebsitesAssociatedWithClients(
    @Param('userType') userType: string,
  ) {
    return await this.websiteService.getWebsitesAssociatedWithClients(userType);
  }

  @Post(':websiteId/pattern')
  @UseGuards(AuthGuard)
  @Roles(UserType.Expert)
  @ApiOperation({
    summary: 'Add pattern in a website',
    description: 'Persist details of a new pattern for a website',
  })
  async addPatternInWebsite(
    @Param('websiteId') websiteId: string,
    @Body() patternCreateDto: PatternCreateDto,
  ) {
    return await this.websiteService.addPatternInWebsite(
      websiteId,
      patternCreateDto,
    );
  }

  @Get(':websiteId/pattern')
  @UseGuards(AuthGuard)
  @Roles(UserType.Expert)
  @ApiOperation({
    summary: 'Fetch all pattern of a website',
    description: 'Fetch all patterns from a particular website',
  })
  async fetchAllPatternsOfWebsite(@Param('websiteId') websiteId: string) {
    return await this.websiteService.fetchAllPatternsOfWebsite(websiteId);
  }

  @Put(':websiteId/pattern/:patternId')
  @UseGuards(AuthGuard)
  @Roles(UserType.Expert)
  @ApiOperation({
    summary: 'Update pattern phase',
    description: 'Update pattern phase of particular pattern',
  })
  async updatePatternPhaseByExpert(
    @Body() updatePatternPhase: UpdatePatternPhase,
  ) {
    return await this.websiteService.updatePatternPhaseByExpert(
      updatePatternPhase,
    );
  }

  @Post(':websiteId/pattern/:patternId/comment')
  @UseGuards(AuthGuard)
  @Roles(UserType.Expert)
  @ApiOperation({
    summary: 'Add comment to pattern',
    description: 'Persist new comment to a pattern for a website',
  })
  async addCommentToPattern(
    @Param('websiteId') websiteId: string,
    @Param('patternId') patternId: string,
    @Body() commentCreateDto: CommentCreateDto,
  ) {
    return await this.websiteService.addCommentToPattern(
      websiteId,
      patternId,
      commentCreateDto,
    );
  }

  @Post(':websiteId/pattern/:patternId/comment/:commentId/reply')
  @UseGuards(AuthGuard)
  @Roles(UserType.Expert)
  @ApiOperation({
    summary: 'Add reply to a comment',
    description: 'Persist reply to a comment of a pattern in a website',
  })
  async addReplyToComment(
    @Param('websiteId') websiteId: string,
    @Param('patternId') patternId: string,
    @Param('commentId') commentId: string,
    @Body() replyCreateDto: ReplyCreateDto,
  ) {
    return await this.websiteService.addReplyToComment(
      websiteId,
      patternId,
      commentId,
      replyCreateDto,
    );
  }

  @Get(':websiteId/pattern/:patternId')
  @UseGuards(AuthGuard)
  @Roles(UserType.Expert)
  @ApiOperation({
    summary: 'Fetch particular pattern details',
    description: 'Retrieve details of particular pattern of a website',
  })
  async fetchPatternDetails(
    @Param('websiteId') websiteId: string,
    @Param('patternId') patternId: string,
  ) {
    return await this.websiteService.fetchParticularPatternDetails(
      websiteId,
      patternId,
    );
  }

  @Put(':websiteId/publish')
  @UseGuards(AuthGuard)
  @Roles(UserType.Expert)
  @ApiOperation({
    summary: 'Publish certification/feedback for a website',
    description: 'Publish final feedback or certification for a website',
  })
  async publishWebsiteCertification(
    @Param('websiteId') websiteId: string,
    @Body() publishDto: PublishCertificationDto,
  ) {
    return await this.websiteService.publishCertifiationDetailsOfWebsite(
      websiteId,
      publishDto,
    );
  }
}
