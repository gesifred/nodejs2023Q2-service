import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumInterface } from './interfaces/album.interfaces';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>
  ) { }
  async create(createAlbumDto: CreateAlbumDto) {
    /*const currAlbum: Album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: null,
    };*/
    const currAlbum = new Album();
    currAlbum.id = uuidv4();
    currAlbum.name = createAlbumDto.name;
    currAlbum.year = createAlbumDto.year;
    currAlbum.artistId = null;
    let id = createAlbumDto.artistId;
    let artistSetled = false
    let artist;
    if (id !== null) artist = await this.artistRepository.findOneBy({ id })
    console.log(artist)
    if (artist) {
      currAlbum.artistId = artist;
      artistSetled = true
    }
    //AlbumDb.addAlbum(currAlbum);
    console.log(currAlbum);
    await this.albumRepository.save(currAlbum);
    if (!artistSetled) currAlbum.artistId = null
    else currAlbum.artistId = createAlbumDto.artistId;
    return currAlbum;
  }

  async findAll() {
    return await this.albumRepository.find({
      /*relations: {
        artist: true
      },*/
    });
    /*return await this.albumRepository.createQueryBuilder("album")
    .leftJoinAndSelect("album.artistId", "artist.name")
    .getMany();*/
    //return AlbumDb.getAllAlbum();
    //return `This action returns all album`;
  }

  async findOne(id: string) {
    const currAlbum: AlbumInterface = await this.albumRepository.findOneBy({ id })//AlbumDb.getAlbum(id);
    /*if (currAlbum === undefined) return false;
    else return currAlbum;*/
    return currAlbum == null ? false : currAlbum;
    //return `This action returns a #${id} album`;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const currAlbum: AlbumInterface = await this.albumRepository.findOneBy({ id })//AlbumDb.getAlbum(id);
    if (currAlbum === null) return undefined;
    else {
      //const updatedAlbum = { ...currAlbum, ...updateAlbumDto }
      const updatedAlbum = { ...currAlbum, ...updateAlbumDto }
      Object.keys(updatedAlbum).forEach(el => {
        if (!Object.keys(currAlbum).includes(el)) delete updatedAlbum[el];
      })
      /*let id = updateAlbumDto.artistId;
      console.log(id);
      if (id !== null) {
        const artist = await this.artistRepository.findOneBy({ id });
        console.log(artist)
        updatedAlbum.artistId = artist == null ? null : artist;
      }*/
      let id = updateAlbumDto.artistId;
      let artistSetled = false
      let artist;
      if (id !== null) artist = await this.artistRepository.findOneBy({ id })
      console.log(artist)
      if (artist) {
        updatedAlbum.artistId = artist;
        artistSetled = true
      }
      if (!artistSetled) updatedAlbum.artistId = null
      //console.log(updatedAlbum.artistId)
      /*if (artist) {
        updatedAlbum.artistId = artist;
      } else {
        updatedAlbum.artistId = null
      }*/
      /*Object.keys(updateAlbumDto).forEach(el => {
        //if (!Object.keys(currAlbum).includes(el)) delete updatedAlbum[el];
        if (!Object.keys(currAlbum).includes(el)) currAlbum[el] = updateAlbumDto[el];
      })*/
      /*if (updateAlbumDto.name) currAlbum.name = updateAlbumDto.name;
      if (updateAlbumDto.year) currAlbum.year = updateAlbumDto.year;
      if (updateAlbumDto.artistId !== undefined)
        currAlbum.artistId = updateAlbumDto.artistId;*/
      console.log(updatedAlbum);
      await this.albumRepository.save(updatedAlbum);
      if (!artistSetled) updatedAlbum.artistId = null
      else updatedAlbum.artistId = updateAlbumDto.artistId;

      //AlbumDb.updateAlbum(currAlbum);
      return updatedAlbum;
    }
  }

  async remove(id: string) {
    const currAlbum: AlbumInterface = await this.albumRepository.findOneBy({ id })//AlbumDb.getAlbum(id);
    if (currAlbum === null) return undefined;
    else {
      await this.albumRepository.delete(id);
      //AlbumDb.deleteAlbum(id);
      /*const tracks = TrackDb.getAllTrack();
      tracks.forEach((track) => {
        if (track.albumId === id) {
          track.albumId = null;
          TrackDb.updateTrack(track);
        }
      });
      FavsDb.remove('album', id);*/
      return true;
    }
  }
}
