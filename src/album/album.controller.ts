import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    console.log(createAlbumDto);
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const resp = this.albumService.findOne(id);
    if (!resp) {
      throw new NotFoundException(`album ${id} doesnt exist in database`);
    } else {
      return resp;
    }
    return this.albumService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = this.albumService.update(id, updateAlbumDto);
    if (album === undefined)
      throw new NotFoundException(`album ${id} doesnt exist in database`);
    else return album;
    //return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    //return this.albumService.remove(id);
    if (this.albumService.remove(id)) return 'Album was found and deleted';
    else throw new NotFoundException(`Album ${id} doesnt exist in database`);
  }
}
