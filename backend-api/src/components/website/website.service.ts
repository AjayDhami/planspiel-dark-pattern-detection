import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
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
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { AwsHelper } from '../aws/aws.helper';

@Injectable()
export class WebsiteService {
  private readonly logger = new Logger(WebsiteService.name);
  constructor(
    @InjectModel(Website.name) private readonly websiteModel: Model<Website>,
    @InjectModel(Pattern.name) private readonly patternModel: Model<Pattern>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly userService: UserService,
    private configService: ConfigService,
    private readonly awsHelper: AwsHelper,
  ) {}

  async persistWebsiteDetails(websiteCreateDto: WebsiteCreateDto) {
    await this.checkUserExists(websiteCreateDto.userId);

    try {
      const newWebsite = new this.websiteModel(websiteCreateDto);
      await newWebsite.save();

      return {
        websiteId: newWebsite._id,
      };
    } catch (error) {
      this.logger.error(`Error while saving website: ${error.message}`);
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
    return await this.convertToWebsiteResponseDto(existingWebsite);
  }

  async getAllWebsiteDetailsForParticularUser(userId: string) {
    const user = await this.checkUserExists(userId);
    let websites: Website[];
    if (user.role === UserType.Client) {
      websites = await this.websiteModel
        .find({ userId })
        .sort({ createdAt: -1 })
        .exec();
    } else if (user.role === UserType.Expert) {
      websites = await this.websiteModel
        .find({
          expertIds: userId,
        })
        .sort({ createdAt: -1 })
        .exec();
    }

    return await Promise.all(
      websites.map(async (website: Website) => {
        return await this.convertToWebsiteResponseDto(website);
      }),
    );
  }

  async getWebsitesAssociatedWithClients(userType: string) {
    const users: UserResponseDto[] =
      await this.userService.fetchUsersByType(userType);

    return await Promise.all(
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
  }

  async addImagesInPattern(patternId: string, files: any) {
    const pattern = await this.checkPatternExists(patternId);
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET');

    const uploadPromises = files.map(async (file) => {
      const { originalname, buffer } = file;
      const fileId = uuid();
      const fileKey = `${fileId}_${originalname}`;
      const params = {
        Bucket: bucketName,
        Key: fileKey,
        Body: buffer,
      };

      await this.awsHelper.executePutObjectCommand(params);
      return fileKey;
    });

    try {
      const patternImageKeys = await Promise.all(uploadPromises);
      pattern.patternImageKeys.push(...patternImageKeys);
      await pattern.save();
      return { message: 'Images added successfully' };
    } catch (error) {
      this.logger.error(
        `Error while adding images in pattern : ${error.message}`,
      );
      throw new Error('Failed to upload files to S3');
    }
  }

  async fetchImageFromPattern(patternId: string) {
    const pattern = await this.checkPatternExists(patternId);
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET');

    const patternImageUrls = await Promise.all(
      pattern.patternImageKeys.map(async (key) => {
        const params = {
          Bucket: bucketName,
          Key: key,
        };

        return await this.awsHelper.executeGetObjectCommand(params);
      }),
    );

    return { patternImageUrls };
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
      this.logger.error(
        `Error while adding pattern in website: ${error.message}`,
      );
      throw new HttpException(
        'Failed to save pattern details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addAutomatedPatternInWebsite(
    websiteId: string,
    patternCreateDtos: PatternCreateDto[],
  ) {
    const website = await this.checkWebsiteExists(websiteId);
    const expertIds = patternCreateDtos.map(
      (patternCreateDto) => patternCreateDto.createdByExpertId,
    );

    const areExpertIdsSame = expertIds.every(
      (expertId) => expertId === expertIds[0],
    );

    if (!areExpertIdsSame) {
      throw new HttpException(
        'SuperAdmin can have only one createdByExpertId',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.checkUserExists(expertIds[0]);

    if (user.role !== UserType.SuperAdmin) {
      throw new HttpException(
        'Only super admin can submit automated patterns',
        HttpStatus.BAD_REQUEST,
      );
    }

    const automatedPatterns = patternCreateDtos.map((patternDto) => {
      const verifications = website.expertIds.map((expertId) => ({
        expertId: expertId,
        expertVerificationPhase: ExpertVerificationPhase.NotVerified,
      }));

      const automatedPattern: Pattern = new this.patternModel({
        patternType: patternDto.patternType,
        websiteId: websiteId,
        isAutoGenerated: true,
        description: patternDto.description,
        detectedUrl: patternDto.detectedUrl,
        createdByExpertId: patternDto.createdByExpertId,
        expertVerifications: verifications,
      });

      return automatedPattern;
    });

    try {
      await this.patternModel.insertMany(automatedPatterns);
      return {
        message: `Automated patterns successfully added`,
      };
    } catch (error) {
      this.logger.error(
        `Error while adding automated pattern details: ${error.message}`,
      );
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
        'Expert not assigned to given website',
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
      this.logger.error(
        `Error while updating pattern phase by expert: ${error.message}`,
      );
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
      this.logger.error(`Error while adding comment: ${error.message}`);
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
      this.logger.error(`Error while adding reply: ${error.message}`);
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
      this.logger.error(
        `Error while fetching particular pattern details: ${error.message}`,
      );
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

    const client = await this.checkUserExists(website.userId);

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

    website.isDarkPatternFree = !anyPatternContainsDarkPattern;
    website.phase = WebsitePhaseType.Published;
    website.isCompleted = true;
    website.expertFeedback = publishDto.expertFeedback;

    try {
      const updatedWebsite = await website.save();
      await this.awsHelper.executeSendEmailCommand(client, updatedWebsite);
      return {
        message: `Certification details successfully published for website with id ${updatedWebsite._id}`,
      };
    } catch (error) {
      this.logger.error(
        `Error while publish website certification details: ${error.message}`,
      );
      throw new HttpException(
        'Failed to publish website certification details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchKpiForClient(clientId: string) {
    const user = await this.checkUserExists(clientId);
    if (user.role !== UserType.Client) {
      throw new HttpException(
        'Client is only allowed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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

  async fetchKpiForExpert(expertId: string) {
    const user = await this.checkUserExists(expertId);
    if (user.role !== UserType.Expert) {
      throw new HttpException(
        'Expert is only allowed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const websites = await this.websiteModel
      .find({ expertIds: expertId })
      .exec();
    const totalWebsitesAssigned = websites.length;

    const totalInProgressWebsites = websites.filter(
      (website) => website.phase === WebsitePhaseType.InProgress,
    ).length;
    const totalPublishedWebsites = websites.filter(
      (website) => website.phase === WebsitePhaseType.Published,
    ).length;

    const patterns = await this.patternModel
      .find({ createdByExpertId: expertId })
      .exec();
    const totalPatternsCreated = patterns.length;

    return {
      totalWebsitesAssigned,
      totalInProgressWebsites,
      totalPublishedWebsites,
      totalPatternsCreated,
    };
  }

  async generateCertification(websiteId: string) {
    const website = await this.checkWebsiteExists(websiteId);

    if (!website.isCompleted) {
      throw new HttpException(
        'Dark pattern check in progress website cannot be certified',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (website.isCompleted) {
      if (!website.isDarkPatternFree) {
        throw new HttpException(
          'Only dark pattern-free websites can be certified.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (website.certificationId) {
      throw new HttpException(
        'The website is already certified and cannot be certified again.',
        HttpStatus.BAD_REQUEST,
      );
    }

    let certificationId: string;
    do {
      certificationId = this.generateCertificationId();
    } while (await this.websiteModel.findOne({ certificationId }));

    website.certificationId = certificationId;

    await website.save();
    return {
      certificationId: website.certificationId,
    };
  }

  private generateCertificationId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let certificationId = '';
    for (let i = 0; i < 12; i++) {
      certificationId += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return certificationId;
  }

  private async checkUserExists(userId: string) {
    const existingUser = await this.userService.findUserById(userId);
    if (!existingUser) {
      this.logger.debug(`User not found with id: ${userId}`);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return existingUser;
  }

  private async checkWebsiteExists(websiteId: string) {
    const existingWebsite = await this.websiteModel.findById(websiteId).exec();
    if (!existingWebsite) {
      this.logger.debug(`Website not found with id: ${websiteId}`);
      throw new HttpException('Website not found', HttpStatus.NOT_FOUND);
    }
    return existingWebsite;
  }

  private async checkPatternExists(patternId: string) {
    const existingPattern = await this.patternModel.findById(patternId).exec();
    if (!existingPattern) {
      this.logger.debug(`Pattern not found with id: ${patternId}`);
      throw new HttpException('Pattern not found', HttpStatus.NOT_FOUND);
    }
    return existingPattern;
  }

  private async checkCommentExists(commentId: string) {
    const existingComment = await this.commentModel.findById(commentId).exec();
    if (!existingComment) {
      this.logger.debug(`Comment not found with id: ${commentId}`);
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
  }

  private async convertToWebsiteResponseDto(
    website: Website,
  ): Promise<WebsiteResponseDto> {
    const expertDetailsPromises = website.expertIds.map(async (expertId) => {
      return {
        id: expertId,
        name: await this.getUserName(expertId),
      };
    });

    const expertDetails = await Promise.all(expertDetailsPromises);
    return {
      websiteId: website._id,
      baseUrl: website.baseUrl,
      websiteName: website.websiteName,
      userId: website.userId,
      additionalUrls: website.additionalUrls,
      description: website.description,
      isCompleted: website.isCompleted,
      phase: website.phase,
      createdAt: website.createdAt,
      isDarkPatternFree: website.isDarkPatternFree,
      expertFeedback: website.expertFeedback,
      expertDetails: expertDetails,
      primaryExpertId: website.primaryExpertId,
      certificationId: website.certificationId,
    };
  }

  private async convertPatternToDto(
    pattern: Pattern,
    commentsRequired: boolean,
  ): Promise<PatternResponseDto> {
    const urls = await this.fetchImageFromPattern(pattern._id);
    return {
      id: pattern._id,
      patternType: pattern.patternType,
      websiteId: pattern.websiteId,
      isAutoGenerated: pattern.isAutoGenerated,
      description: pattern.description,
      detectedUrl: pattern.detectedUrl,
      patternImageUrls: urls.patternImageUrls,
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
