import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interfaces';
import { v4 as uuidv4 } from 'uuid';
import AlbumDb from './InMemoryAlbumDb';
import TrackDb from 'src/track/InMemoryTrackDb';
import FavsDb from 'src/favs/InMemoryFavsDb';
@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const currAlbum: Album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId || null
    }
    AlbumDb.addAlbum(currAlbum);
    return currAlbum;
  }

  findAll() {
    return AlbumDb.getAllAlbum();
    return `This action returns all album`;
  }

  findOne(id: string) {
    const currAlbum: Album = AlbumDb.getAlbum(id);
    if (currAlbum === undefined)
      return false;
    else
      return currAlbum;

    return `This action returns a #${id} album`;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    let currAlbum: Album = AlbumDb.getAlbum(id);
    if (currAlbum === undefined)
      return undefined;
    else {
      if (updateAlbumDto.name) currAlbum.name = updateAlbumDto.name;
      if (updateAlbumDto.year) currAlbum.year = updateAlbumDto.year;
      if (updateAlbumDto.artistId !== undefined) currAlbum.artistId = updateAlbumDto.artistId;
      AlbumDb.updateAlbum(currAlbum);
      return currAlbum;
    }
    return `This action updates a #${id} album`;
  }

  remove(id: string) {
    let currAlbum: Album = AlbumDb.getAlbum(id);
    if (currAlbum === undefined)
      return undefined;
    else {
      AlbumDb.deleteAlbum(id);
      const tracks = TrackDb.getAllTrack();
      tracks.forEach(track => {
        if (track.albumId === id) {
          track.albumId = null;
          TrackDb.updateTrack(track);
        }
      })
      FavsDb.remove("album", id);
      return true;
    }
    return `This action removes a #${id} album`;
  }
}
