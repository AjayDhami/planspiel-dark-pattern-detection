import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { DuplicateKeyException } from 'src/exception/duplicate-key.exception';
import { SigninUserDto } from './dto/signin-user.dto';

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
      if (error.code === 11000) {
        throw new DuplicateKeyException(
          'Email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() signInUserDto: SigninUserDto) {
    try {
      const result = await this.userService.signIn(signInUserDto);
      return { message: result.message, statusCode: HttpStatus.OK };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException({
          message: 'Invalid credentials',
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      }
      throw error;
    }
  }
}
