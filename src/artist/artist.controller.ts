import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseUUIDPipe, NotFoundException, Put, ForbiddenException } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createArtistDto: CreateArtistDto) {
    console.log(createArtistDto);
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const resp = this.artistService.findOne(id);
    if (!resp) {
      throw new NotFoundException(`user ${id} doesnt exist in database`);
    } else {
      return resp;
    }
  }

  @Put(':id')
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto) {
      const artist = this.artistService.update(id, updateArtistDto);
      if( artist === undefined )
        throw new NotFoundException(`artist ${id} doesnt exist in database`);
      else 
        return artist;
    //return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    //return this.artistService.remove(id);
    if (this.artistService.remove(id))
      return "Artist was found and deleted"
    else 
      throw new NotFoundException(`Artist ${id} doesnt exist in database`);
  }
}
