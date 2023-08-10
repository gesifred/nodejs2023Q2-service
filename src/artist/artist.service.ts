import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistInterface } from './interfaces/artist.interfaces';
import { v4 as uuidv4 } from 'uuid';
import ArtistDb from './InMemoryArtistDb';
import AlbumDb from 'src/album/InMemoryAlbumDb';
import TrackDb from 'src/track/InMemoryTrackDb';
import FavsDb from 'src/favs/InMemoryFavsDb';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>
  ) {}
  async create(createArtistDto: CreateArtistDto) {
    console.log(createArtistDto);

    const currentArtist: ArtistInterface = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    ArtistDb.addArtist(currentArtist);
    await this.artistRepository.save(currentArtist);
    return currentArtist;
  }

  findAll() {
    return ArtistDb.getAllArtist();
    return `This action returns all artist`;
  }

  findOne(id: string) {
    const currentArtist: ArtistInterface = ArtistDb.getArtist(id);

    /*this.cats.forEach(cat => {
      if (cat.id == id) currentCat = cat
    });*/
    if (currentArtist === undefined) return false;
    else return currentArtist;

    return `This action returns a #${id} artist`;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const currentArtist: ArtistInterface = ArtistDb.getArtist(id);
    if (currentArtist === undefined) return undefined;
    else {
      if (updateArtistDto.name) currentArtist.name = updateArtistDto.name;
      if (updateArtistDto.grammy !== undefined)
        currentArtist.grammy = updateArtistDto.grammy;
      ArtistDb.updateArtist(currentArtist);
      return currentArtist;
    }
    return `This action updates a #${id} artist`;
  }

  remove(id: string) {
    const currentArtist: ArtistInterface = ArtistDb.getArtist(id);
    if (currentArtist === undefined) return undefined;
    else {
      ArtistDb.deleteArtist(id);
      const albums = AlbumDb.getAllAlbum();
      albums.forEach((album) => {
        if (album.artistId === id) {
          album.artistId = null;
          AlbumDb.updateAlbum(album);
        }
      });
      const tracks = TrackDb.getAllTrack();
      tracks.forEach((track) => {
        if (track.artistId === id) {
          track.artistId = null;
          TrackDb.updateTrack(track);
        }
      });
      FavsDb.remove('artist', id);
      return true;
    }
    return `This action removes a #${id} artist`;
  }
}
