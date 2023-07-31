import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateArtistDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    /*@Transform(({obj, key}) => {
        return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
      })*/
    @IsBoolean()
    @IsNotEmpty()
    grammy: boolean
}
