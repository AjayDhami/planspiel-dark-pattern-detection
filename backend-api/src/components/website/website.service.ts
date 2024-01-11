import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WebsiteCreateDto } from './dto/website-create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Website } from './schemas/website.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/components/user/user.service';
import { WebsiteResponseDto } from './dto/website-response.dto';
import { PatternCreateDto } from './dto/pattern-create.dto';
import { Pattern, Verification } from './schemas/pattern.schema';
import { Comment, Reply } from './schemas/comment.schema';
import { CommentCreateDto } from './dto/comment-create.dto';
import { ReplyCreateDto } from './dto/reply-create.dto';
import { PatternResponseDto } from './dto/pattern-response.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { ReplyResponseDto } from './dto/reply-response.dto';
import { AssignExpertsDto } from './dto/assign-experts.dto';
import { UserType } from '../user/enum/user-type.enum';
import { ExpertVerificationPhase } from './enum/expert-verification-phase.enum';
import { UpdatePatternPhase } from './dto/update-pattern-phase.dto';
import { PatternPhaseType } from './enum/pattern-phase.enum';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { WebsitePhaseType } from './enum/website-phase.enum';
import { PublishCertificationDto } from './dto/publish-certification.dto';
import { ExpertVerificationDto } from './dto/expert-verification.dto';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectModel(Website.name) private readonly websiteModel: Model<Website>,
    @InjectModel(Pattern.name) private readonly patternModel: Model<Pattern>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly userService: UserService,
  ) {}

  async persistWebsiteDetails(websiteCreateDto: WebsiteCreateDto) {
    const existingUser = await this.checkUserExists(websiteCreateDto.userId);

    try {
      const newWebsite = new this.websiteModel(websiteCreateDto);
      await newWebsite.save();

      const updatedUser = await this.userService.updateUserWithWebsiteId(
        existingUser._id,
        newWebsite._id,
      );

      if (!updatedUser) {
        throw new HttpException(
          'Failed to update user with website ID',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        websiteId: newWebsite._id,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to save website details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async assignExpertsToWebsite(
    websiteId: string,
    assignExpertsDto: AssignExpertsDto,
  ) {
    const website = await this.checkWebsiteExists(websiteId);
    const allExpertIds = [
      ...assignExpertsDto.expertIds,
      assignExpertsDto.primaryExpertId,
    ];

    await Promise.all(
      allExpertIds.map(async (expertId) => {
        await this.checkUserExists(expertId);
      }),
    );

    website.expertIds = assignExpertsDto.expertIds;
    website.primaryExpertId = assignExpertsDto.primaryExpertId;

    const updatedWebsite = await website.save();
    return {
      message: `Expert successfully assigned to website with id: ${updatedWebsite._id}`,
    };
  }

  async fetchParticularWebsiteDetails(
    websiteId: string,
  ): Promise<WebsiteResponseDto> {
    const existingWebsite = await this.checkWebsiteExists(websiteId);
    return this.convertToWebsiteResponseDto(existingWebsite);
  }

  async getAllWebsiteDetailsForParticularUser(userId: string) {
    const user = await this.checkUserExists(userId);
    let websites;
    if (user.role === UserType.Client) {
      websites = await this.websiteModel.find({ userId }).exec();
    } else if (user.role === UserType.Expert) {
      websites = await this.websiteModel
        .find({
          expertIds: userId,
        })
        .exec();
    }
    return websites.map((website) => this.convertToWebsiteResponseDto(website));
  }

  async getWebsitesAssociatedWithClients(userType: string) {
    console.log('user website details');
    const users: UserResponseDto[] =
      await this.userService.fetchUsersByType(userType);

    const usersWithWebsites = await Promise.all(
      users.map(async (user) => {
        const websites = await this.websiteModel
          .find({ userId: user.userId })
          .exec();

        const formattedWebsites = websites.map((website) => ({
          websiteId: website.id,
          baseUrl: website.baseUrl,
          websiteName: website.websiteName,
          description: website.description,
        }));

        return {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          websites: formattedWebsites,
        };
      }),
    );

    return usersWithWebsites;
  }

  async addPatternInWebsite(
    websiteId: string,
    patternCreateDto: PatternCreateDto,
  ) {
    await this.checkUserExists(patternCreateDto.createdByExpertId);
    const website = await this.checkWebsiteExists(websiteId);

    if (!website.expertIds.includes(patternCreateDto.createdByExpertId)) {
      throw new HttpException(
        'Expert not assigned to the website',
        HttpStatus.BAD_REQUEST,
      );
    }

    const verifications = website.expertIds.map((expertId) => ({
      expertId: expertId,
      expertVerificationPhase: ExpertVerificationPhase.NotVerified,
    }));

    const newPattern: Pattern = new this.patternModel({
      patternType: patternCreateDto.patternType,
      websiteId: websiteId,
      isAutoGenerated: false,
      description: patternCreateDto.description,
      detectedUrl: patternCreateDto.detectedUrl,
      createdByExpertId: patternCreateDto.createdByExpertId,
      expertVerifications: verifications,
    });
    try {
      await newPattern.save();
      return { patternId: newPattern._id };
    } catch (error) {
      throw new HttpException(
        'Failed to save pattern details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchAllPatternsOfWebsite(websiteId: string) {
    const patternList = await this.patternModel.find({ websiteId }).exec();
    return await Promise.all(
      patternList.map((pattern) => this.convertPatternToDto(pattern, false)),
    );
  }

  async updatePatternPhaseByExpert(updatePatternPhase: UpdatePatternPhase) {
    const { websiteId, patternId, expertId, patternExists } =
      updatePatternPhase;

    const pattern = await this.patternModel
      .findOne({
        websiteId: websiteId,
        _id: patternId,
      })
      .exec();

    if (!pattern) {
      throw new HttpException('Pattern not found', HttpStatus.NOT_FOUND);
    }

    if (pattern.patternPhase === PatternPhaseType.Verified) {
      throw new HttpException('Pattern already verified', HttpStatus.NOT_FOUND);
    }

    const expertVerification = pattern.expertVerifications.find(
      (verification) => verification.expertId === expertId,
    );

    if (!expertVerification) {
      throw new HttpException(
        'Expert not assinged to given website',
        HttpStatus.BAD_REQUEST,
      );
    }

    expertVerification.expertVerificationPhase = patternExists
      ? ExpertVerificationPhase.VerifiedWithPattern
      : ExpertVerificationPhase.VerifiedWithoutPattern;

    const anyExpertVerificationNotVerified = pattern.expertVerifications.some(
      (verification) =>
        verification.expertVerificationPhase ===
        ExpertVerificationPhase.NotVerified,
    );

    pattern.patternPhase = anyExpertVerificationNotVerified
      ? PatternPhaseType.InProgress
      : PatternPhaseType.Verified;

    if (pattern.patternPhase === PatternPhaseType.Verified) {
      pattern.isPatternExists = pattern.expertVerifications.some(
        (verification) =>
          verification.expertVerificationPhase ===
          ExpertVerificationPhase.VerifiedWithPattern,
      );
    }

    pattern.markModified('expertVerifications');
    try {
      await pattern.save();
      return {
        message: `Pattern phase updated for pattern with id ${pattern._id}`,
      };
    } catch (error) {
      console.error('Error saving pattern:', error.message);
      throw new HttpException(
        'Failed to update pattern phase',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addCommentToPattern(
    websiteId: string,
    patternId: string,
    commentCreateDto: CommentCreateDto,
  ) {
    await this.checkUserExists(commentCreateDto.expertId);
    await this.checkWebsiteExists(websiteId);
    await this.checkPatternExists(patternId);

    const newComment = new this.commentModel({
      ...commentCreateDto,
      websiteId: websiteId,
      patternId: patternId,
    });

    try {
      const savedComment = await newComment.save();

      await this.patternModel.findByIdAndUpdate(
        patternId,
        { $push: { comments: savedComment } },
        { new: true },
      );

      return { commentId: savedComment._id };
    } catch (error) {
      throw new HttpException(
        'Failed to add comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addReplyToComment(
    websiteId: string,
    patternId: string,
    commentId: string,
    replyCreateDto: ReplyCreateDto,
  ) {
    await this.checkUserExists(replyCreateDto.expertId);
    await this.checkWebsiteExists(websiteId);
    await this.checkPatternExists(patternId);
    await this.checkCommentExists(commentId);

    try {
      const updatedComment = await this.commentModel.findByIdAndUpdate(
        commentId,
        { $push: { replies: { ...replyCreateDto, createdAt: new Date() } } },
        { new: true },
      );

      await this.patternModel.findByIdAndUpdate(
        patternId,
        { $set: { 'comments.$[elem]': updatedComment } },
        { arrayFilters: [{ 'elem._id': commentId }], new: true },
      );

      return { message: 'Reply successfully added' };
    } catch (error) {
      throw new HttpException(
        'Failed to add reply',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchParticularPatternDetails(websiteId: string, patternId: string) {
    try {
      const pattern = await this.patternModel
        .findOne({
          _id: patternId,
          websiteId: websiteId,
        })
        .exec();

      if (!pattern) {
        throw new HttpException('Pattern not found', HttpStatus.NOT_FOUND);
      }
      return this.convertPatternToDto(pattern, true);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to fetch pattern details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async publishCertificationDetailsOfWebsite(
    websiteId: string,
    publishDto: PublishCertificationDto,
  ) {
    await this.checkUserExists(publishDto.expertId);
    const website = await this.checkWebsiteExists(websiteId);

    if (website.isCompleted === true) {
      throw new HttpException(
        'Website is already published!!!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (website.primaryExpertId !== publishDto.expertId) {
      throw new HttpException(
        'Expert doesnot have authority to publish the website certification details',
        HttpStatus.BAD_REQUEST,
      );
    }

    const patterns = await this.patternModel
      .find({ websiteId: websiteId })
      .exec();

    const isAllPatternsVerified = patterns.every(
      (pattern) => pattern.patternPhase === PatternPhaseType.Verified,
    );

    if (!isAllPatternsVerified) {
      throw new HttpException(
        'Not all patterns are verified by experts',
        HttpStatus.BAD_REQUEST,
      );
    }

    const anyPatternContainsDarkPattern = patterns.some(
      (pattern) => pattern.isPatternExists,
    );

    if (publishDto.isCertified && anyPatternContainsDarkPattern) {
      throw new HttpException(
        'Cannot provide certification to website containing dark pattern',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!publishDto.isCertified && !anyPatternContainsDarkPattern) {
      throw new HttpException(
        'Should provide certification to website free of dark patterns',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      !publishDto.isCertified &&
      (!publishDto.expertFeedback || !publishDto.expertFeedback.trim())
    ) {
      throw new HttpException(
        'Need to provide feedback for website containing dark pattern',
        HttpStatus.BAD_REQUEST,
      );
    }

    website.isDarkPatternFree = anyPatternContainsDarkPattern ? false : true;
    website.phase = WebsitePhaseType.Published;
    website.isCompleted = true;
    website.expertFeedback = publishDto.expertFeedback;

    try {
      const updatedWebsite = await website.save();
      return {
        message: `Certification details successfully published for website with id ${updatedWebsite._id}`,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to publish webiste certification details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchKpiForClient(clientId: string) {
    await this.checkUserExists(clientId);
    const websites = await this.websiteModel.find({ userId: clientId }).exec();

    const totalWebsites = websites.length;

    const websitesInProgress = websites.filter(
      (website) => website.phase === WebsitePhaseType.InProgress,
    ).length;

    const websitesCertified = websites.filter(
      (website) =>
        website.phase === WebsitePhaseType.Published &&
        website.isDarkPatternFree,
    ).length;

    const websitesRejected = websites.filter(
      (website) =>
        website.phase === WebsitePhaseType.Published &&
        !website.isDarkPatternFree,
    ).length;

    return {
      totalWebsites,
      websitesInProgress,
      websitesCertified,
      websitesRejected,
    };
  }

  private async checkUserExists(userId: string) {
    const existingUser = await this.userService.findUserById(userId);
    if (!existingUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return existingUser;
  }

  private async checkWebsiteExists(websiteId: string) {
    const existingWebsite = await this.websiteModel.findById(websiteId).exec();
    if (!existingWebsite) {
      throw new HttpException('Website not found', HttpStatus.NOT_FOUND);
    }
    return existingWebsite;
  }

  private async checkPatternExists(patternId: string) {
    const existingPattern = await this.patternModel.findById(patternId).exec();
    if (!existingPattern) {
      throw new HttpException('Pattern not found', HttpStatus.NOT_FOUND);
    }
  }

  private async checkCommentExists(commentId: string) {
    const existingComment = await this.commentModel.findById(commentId).exec();
    if (!existingComment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
  }

  private convertToWebsiteResponseDto(website: Website): WebsiteResponseDto {
    return {
      websiteId: website._id,
      baseUrl: website.baseUrl,
      websiteName: website.websiteName,
      userId: website.userId,
      additionalUrls: website.additionalUrls,
      description: website.description,
      isCompleted: website.isCompleted,
      phase: website.phase,
      isDarkPatternFree: website.isDarkPatternFree,
      expertFeedback: website.expertFeedback,
      expertIds: website.expertIds,
      primaryExpertId: website.primaryExpertId,
    };
  }

  private async convertPatternToDto(
    pattern: Pattern,
    commentsRequired: boolean,
  ): Promise<PatternResponseDto> {
    return {
      id: pattern._id,
      patternType: pattern.patternType,
      websiteId: pattern.websiteId,
      isAutoGenerated: pattern.isAutoGenerated,
      description: pattern.description,
      detectedUrl: pattern.detectedUrl,
      patternPhase: pattern.patternPhase,
      isPatternExists: pattern.isPatternExists,
      createdByExpertId: pattern.createdByExpertId,
      expertName: await this.getUserName(pattern.createdByExpertId),
      expertVerifications: await Promise.all(
        pattern.expertVerifications.map((verification) =>
          this.convertVerificationsToDto(verification),
        ),
      ),
      createdAt: pattern.createdAt,
      comments: commentsRequired
        ? await Promise.all(
            pattern.comments.map((comment) =>
              this.convertCommentToDto(comment),
            ),
          )
        : [],
    };
  }

  private async convertVerificationsToDto(
    verification: Verification,
  ): Promise<ExpertVerificationDto> {
    return {
      expertId: verification.expertId,
      expertName: await this.getUserName(verification.expertId),
      expertVerificationPhase: verification.expertVerificationPhase,
    };
  }

  private async convertCommentToDto(
    comment: Comment,
  ): Promise<CommentResponseDto> {
    return {
      id: comment._id,
      websiteId: comment.websiteId,
      patternId: comment.patternId,
      expertId: comment.expertId,
      expertName: await this.getUserName(comment.expertId),
      content: comment.content,
      createdAt: comment.createdAt,
      replies: await Promise.all(
        comment.replies.map((reply) => this.convertReplyToDto(reply)),
      ),
    };
  }

  private async convertReplyToDto(reply: Reply): Promise<ReplyResponseDto> {
    return {
      expertId: reply.expertId,
      expertName: await this.getUserName(reply.expertId),
      content: reply.content,
      createdAt: reply.createdAt,
    };
  }

  private async getUserName(userId: string) {
    const user = await this.checkUserExists(userId);
    return user.firstName + ' ' + user.lastName;
  }
}
