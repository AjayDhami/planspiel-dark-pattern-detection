import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpUserDto } from './dto/signup-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { DuplicateKeyException } from 'src/exception/duplicate-key.exception';
import { SigninUserDto } from './dto/signin-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async signUp(
    userDto: SignUpUserDto,
  ): Promise<{ message: string; statusCode: number }> {
    try {
      const newUser = new this.userModel(userDto);
      await newUser.save();
      return {
        message: 'User signed up successfully',
        statusCode: HttpStatus.CREATED,
      };
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

  async signIn(
    signInUserDto: SigninUserDto,
  ): Promise<{ message: string; statusCode: number }> {
    const { email, password } = signInUserDto;

    const user = await this.userModel.findOne({ email, password }).exec();
    console.log('user, ', user);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid credentials',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    // Logic for successful sign-in (generate token, etc.)

    return {
      message: 'User signed in successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
