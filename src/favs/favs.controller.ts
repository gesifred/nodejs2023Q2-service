import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  UnprocessableEntityException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';
enum FavsAvailables {
  Artist = 'artist',
  Album = 'album',
  Track = 'track',
}
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  //, @Param('el', new ParseEnumPipe(FavsAvailables, { errorHttpStatusCode: HttpStatus.NOT_FOUND, })) el: string
  @Post('/artist/:id')
  @HttpCode(201)
  async addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (await this.favsService.addArtist(FavsAvailables.Artist, id))
      return `Artist ${id} added succesfully`;
    throw new UnprocessableEntityException(`Artist ${id} does not exist`); //422
    //return el + "/" + id;
  }
  @Delete('/artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (await this.favsService.removeArtist(FavsAvailables.Artist, id))
      return `Artist ${id} removed`;
    throw new NotFoundException(`Artist ${id} is not a favorite`);
    //return this.favsService.remove(+id);
  }
  @Post('/album/:id')
  @HttpCode(201)
  async addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (await this.favsService.addAlbum(FavsAvailables.Album, id))
      return `Album ${id} added succesfully`;
    throw new UnprocessableEntityException(`Album ${id} does not exist`); //422
    //return el + "/" + id;
  }
  @Delete('/album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (await this.favsService.removeAlbum(FavsAvailables.Album, id))
      return `Album ${id} removed`;
    throw new NotFoundException(`Album ${id} is not a favorite`);
    //return this.favsService.remove(+id);
  }
  @Post('/track/:id')
  @HttpCode(201)
  async add(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (await this.favsService.addTrack(FavsAvailables.Track, id))
      return `Track ${id} added succesfully`;
    throw new UnprocessableEntityException(`Track ${id} does not exist`); //422
    //return el + "/" + id;
  }
  @Delete('/track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (await this.favsService.removeTrack(FavsAvailables.Track, id))
      return `Track ${id} removed`;
    throw new NotFoundException(`Track ${id} is not a favorite`);
  }
  @Get()
  async findAll() {
    return await this.favsService.findAll();
  }

  /*
    @Delete('/:el/:id')
  remove(@Param('id') id: string, @Param('el') el: string) {
    if(!["track","album","artist"].includes(el)){
      throw new NotFoundException("route doesnt exist");
    }
    return el + "/" + id;
    //return this.favsService.remove(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavDto: UpdateFavDto) {
    return this.favsService.update(+id, updateFavDto);
  }
*/
}
