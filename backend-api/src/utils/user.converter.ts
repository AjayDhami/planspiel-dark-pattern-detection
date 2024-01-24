import { User } from '../components/user/schemas/user.schema';
import { UserResponseDto } from '../components/user/dto/user-response.dto';

export function convertUserToDto(user: User): UserResponseDto {
  return {
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}
