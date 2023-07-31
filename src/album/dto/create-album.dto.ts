import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @IsUUID("4")
  @IsOptional()
  artistId: string | null; // refers to Artist
}
