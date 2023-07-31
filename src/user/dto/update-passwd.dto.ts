import { UpdatePasswordDto } from '../interfaces/user.interfaces';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto implements UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string; // previous password
  @IsNotEmpty()
  @IsString()
  newPassword: string; // new password
  @IsOptional()
  @IsString()
  login: string;
}
