import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistInterface } from './interfaces/artist.interfaces';
import { v4 as uuidv4 } from 'uuid';
import ArtistDb from './InMemoryArtistDb';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>
  ) { }
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

  async findAll() {
    return await this.artistRepository.find();
    //return all;
  }

  async findOne(id: string) {
    const currentArtist: ArtistInterface = await this.artistRepository.findOneBy({ id })//ArtistDb.getArtist(id);
    console.log(currentArtist)
    /*this.cats.forEach(cat => {
      if (cat.id == id) currentCat = cat
    });*/
    /*if (currentArtist == null) return false;
    else return currentArtist;*/
    return currentArtist == null ? false : currentArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const currentArtist: ArtistInterface = await this.artistRepository.findOneBy({ id })//ArtistDb.getArtist(id);
    if (currentArtist === null) return undefined;
    else {
      const updatedArtist = { ...currentArtist, ...updateArtistDto }
      Object.keys(updatedArtist).forEach(el => {
        if (!Object.keys(currentArtist).includes(el)) delete updatedArtist[el];
      })
      /*if (updateArtistDto.name) currentArtist.name = updateArtistDto.name;
      if (updateArtistDto.grammy !== undefined)
        currentArtist.grammy = updateArtistDto.grammy;
      ArtistDb.updateArtist(currentArtist);*/
      await this.artistRepository.save(updatedArtist);
      return updatedArtist;
    }
    return `This action updates a #${id} artist`;
  }

  async remove(id: string) {
    const currentArtist: ArtistInterface = await this.artistRepository.findOneBy({ id }) //ArtistDb.getArtist(id);
    console.log(currentArtist)
    if (currentArtist == null) return undefined;
    else {
      //ArtistDb.deleteArtist(id);
      await this.artistRepository.delete(id);
      /*const albums = AlbumDb.getAllAlbum();
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
      FavsDb.remove('artist', id);*/
      return true;
    }
  }
}
