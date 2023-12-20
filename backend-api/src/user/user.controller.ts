import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { DuplicateKeyException } from 'src/exception/duplicate-key.exception';
import { SigninUserDto } from './dto/signin-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    try {
      const result = await this.userService.signUp(signUpUserDto);
      return { message: result.message, statusCode: HttpStatus.CREATED };
    } catch (error) {
      throw new DuplicateKeyException(error.message, error.getStatus());
    }
  }

  @Post('signin')
  async signIn(@Body() signInUserDto: SigninUserDto) {
    try {
      const result = await this.userService.signIn(signInUserDto);
      return {
        accessToken: result.accessToken,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException({
          message: error.message,
          statusCode: error.getStatus(),
        });
      }
      throw error;
    }
  }

  @Get(':userId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async fetchUserDetails(@Param('userId') userId: string) {
    return await this.userService.fetchParticularUserDetails(userId);
  }
}
