import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WebsiteCreateDto } from './dto/website-create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Website } from './schemas/website.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { WebsiteResponseDto } from './dto/website-response.dto';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectModel(Website.name) private readonly websiteModel: Model<Website>,
    private readonly userService: UserService,
  ) {}

  async persistWebsiteDetails(websiteCreateDto: WebsiteCreateDto) {
    const existingUser = await this.userService.findUserById(
      websiteCreateDto.userId,
    );
    if (!existingUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

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

  async fetchParticularWebsiteDetails(
    websiteId: string,
  ): Promise<WebsiteResponseDto> {
    const existingWebsite = await this.websiteModel.findById(websiteId).exec();
    if (!existingWebsite) {
      throw new HttpException(
        'Failed to fetch website details',
        HttpStatus.NOT_FOUND,
      );
    }
    const websiteResponseDto: WebsiteResponseDto = {
      websiteId: existingWebsite._id,
      baseUrl: existingWebsite.baseUrl,
      websiteName: existingWebsite.websiteName,
      userId: existingWebsite.userId,
      additionalUrls: existingWebsite.additionalUrls,
      description: existingWebsite.description,
      isCompleted: existingWebsite.isCompleted,
      phase: existingWebsite.phase,
    };
    return websiteResponseDto;
  }
}
