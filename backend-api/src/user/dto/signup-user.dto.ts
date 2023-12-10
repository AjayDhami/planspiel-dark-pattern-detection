import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserType } from '../enum/user-type.enum';

export class SignUpUserDto {
  @IsNotEmpty({ message: 'First name cannot be empty' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name cannot be empty' })
  lastName: string;

  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsString({ message: 'Role must be string' })
  @IsEnum(UserType, { message: 'Invalid role' })
  role: string;
}
