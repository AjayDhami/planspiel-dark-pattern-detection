import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { DuplicateKeyException } from 'src/exception/duplicate-key.exception';
import { SigninUserDto } from './dto/signin-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    try {
      const result = await this.userService.signUp(signUpUserDto);
      return { message: result.message, statusCode: HttpStatus.CREATED };
    } catch (error) {
      throw new DuplicateKeyException(error.message, error.getStatus());
    }
  }

  @Get('signin')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() signInUserDto: SigninUserDto) {
    try {
      const result = await this.userService.signIn(signInUserDto);
      return {
        message: result.message,
        statusCode: result.statusCode,
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

  @Get()
  @UseGuards(AuthGuard)
  getUserDetails() {
    return 'Test auth guard';
  }
}
