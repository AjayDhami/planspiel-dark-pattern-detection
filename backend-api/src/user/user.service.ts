import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpUserDto } from './dto/signup-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { DuplicateKeyException } from 'src/exception/duplicate-key.exception';
import { SigninUserDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(
    userDto: SignUpUserDto,
  ): Promise<{ message: string; statusCode: number }> {
    try {
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      const newUser = new this.userModel({
        ...userDto,
        password: hashedPassword,
      });
      await newUser.save();
      return {
        message: 'User signed up successfully',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      if (error.name === 'ValidationError' && error.errors.email.message) {
        throw new DuplicateKeyException(
          error.errors.email.message,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }

  async signIn(signInUserDto: SigninUserDto): Promise<{ accessToken: string }> {
    const { email, password, role } = signInUserDto;

    const user = await this.userModel.findOne({ email, role }).exec();

    if (!user || !(await this.comparePasswords(password, user.password))) {
      throw new UnauthorizedException({
        message: 'Invalid credentials',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    const accessToken = this.generateAccessToken(user);

    return {
      accessToken,
    };
  }

  private generateAccessToken(user: User): string {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return `Bearer ${token}`;
  }

  private async comparePasswords(
    plainText: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainText, hashedPassword);
  }

  async findUserById(userId: string): Promise<User | null> {
    return await this.userModel.findById(userId).exec();
  }

  async updateUserWithWebsiteId(
    userId: string,
    websiteId: string,
  ): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $push: { websiteIds: websiteId.toString() } },
        { new: true },
      )
      .exec();
  }
}
