import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackInterface } from './interfaces/track.interfaces';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>
  ){}
  async create(createTrackDto: CreateTrackDto) {
    /*const currTrack: TrackInterface = {
      id: uuidv4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
    };*/
    //TrackDb.addTrack(currTrack);
    const currTrack = new Track();
    currTrack.id = uuidv4();
    currTrack.name = createTrackDto.name;
    currTrack.duration = createTrackDto.duration;
    console.log(currTrack.id);
    let id = createTrackDto.artistId;
    const artist = await this.artistRepository.findOneBy({ id })
    let artistSettled = false, albumSettled = false 
    if (artist) {
      currTrack.artistId = artist;
      artistSettled = true
    } else {
      currTrack.artistId = null
    }

    id = createTrackDto.albumId;
    const album = await this.albumRepository.findOneBy({ id })
    if (album) {
      currTrack.albumId = album;
      albumSettled = true;
    } else {
      currTrack.albumId = null
    }
    console.log(album)
    await this.trackRepository.save(currTrack);
    currTrack.albumId = albumSettled ? createTrackDto.albumId: null;
    currTrack.artistId = artistSettled ? createTrackDto.artistId: null;
    return currTrack;
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const currTrack: TrackInterface = await this.trackRepository.findOneBy({ id })//TrackDb.getTrack(id);
    /*if (currTrack === undefined) return false;
    else return currTrack;*/
    return currTrack == null ? false : currTrack;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const currTrack: TrackInterface = await this.trackRepository.findOneBy({ id })//TrackDb.getTrack(id);
    if (currTrack === null) return undefined;
    else {
      const updatedTrack = { ...currTrack, ...updateTrackDto }
      Object.keys(updatedTrack).forEach(el => {
        if (!Object.keys(currTrack).includes(el)) delete updatedTrack[el];
      })
      /*if (updateTrackDto.name) currTrack.name = updateTrackDto.name;
      if (updateTrackDto.duration) currTrack.duration = updateTrackDto.duration;
      if (updateTrackDto.artistId !== undefined)
        currTrack.artistId = updateTrackDto.artistId;
      if (updateTrackDto.albumId !== undefined)
        currTrack.albumId = updateTrackDto.albumId;*/
      //TrackDb.updateTrack(currTrack);
      await this.trackRepository.save(updatedTrack);
      return updatedTrack;
    }
  }

  async remove(id: string) {
    const currTrack: TrackInterface = await this.trackRepository.findOneBy({ id })//TrackDb.getTrack(id);
    if (currTrack === null) return undefined;
    else {
      //TrackDb.deleteTrack(id);
      await this.trackRepository.delete(id);
      //FavsDb.remove('track', id);
      return true;
    }
  }
}
