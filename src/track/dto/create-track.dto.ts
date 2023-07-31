import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string; //uuidv4

  @IsUUID('4')
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsUUID('4')
  @IsOptional()
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}
