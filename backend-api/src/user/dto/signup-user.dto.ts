import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
}
