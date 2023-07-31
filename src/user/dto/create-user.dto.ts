//import { CreateUserDto } from '../interfaces/user.interfaces';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements CreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
