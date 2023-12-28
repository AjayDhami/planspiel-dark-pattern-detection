import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WebsiteCreateDto } from './dto/website-create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Website } from './schemas/website.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/components/user/user.service';
import { WebsiteResponseDto } from './dto/website-response.dto';
import { PatternCreateDto } from './dto/pattern-create.dto';
import { Pattern } from './schemas/pattern.schema';
import { Comment, Reply } from './schemas/comment.schema';
import { CommentCreateDto } from './dto/comment-create.dto';
import { ReplyCreateDto } from './dto/reply-create.dto';
import { PatternResponseDto } from './dto/pattern-response.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { ReplyResponseDto } from './dto/reply-response.dto';
import { AssignExpertsDto } from './dto/assign-experts.dto';

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
    const websites = await this.websiteModel.find({ userId }).exec();

    return websites.map((website) => this.convertToWebsiteResponseDto(website));
  }

  async addPatternInWebsite(
    websiteId: string,
    patternCreateDto: PatternCreateDto,
  ) {
    await this.checkUserExists(patternCreateDto.expertId);

    const newPattern: Pattern = new this.patternModel({
      type: patternCreateDto.type,
      websiteId: websiteId,
      isAutoGenerated: false,
      expertId: patternCreateDto.expertId,
      description: patternCreateDto.description,
      detectedUrl: patternCreateDto.detectedUrl,
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
    };
  }

  private async convertPatternToDto(
    pattern: Pattern,
    commentsRequired: boolean,
  ): Promise<PatternResponseDto> {
    return {
      id: pattern._id,
      type: pattern.type,
      websiteId: pattern.websiteId,
      isAutoGenerated: pattern.isAutoGenerated,
      expertId: pattern.expertId,
      expertName: await this.getUserName(pattern.expertId),
      description: pattern.description,
      detectedUrl: pattern.detectedUrl,
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
