import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserType } from '../enum/user-type.enum';

export class SigninUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString({ message: 'Password must be string' })
  password: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsString({ message: 'Role must be string' })
  @IsEnum(UserType, { message: 'Invalid role' })
  role: string;
}
