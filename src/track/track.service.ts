import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interfaces';
import TrackDb from './InMemoryTrackDb';
import { v4 as uuidv4 } from 'uuid';
import FavsDb from 'src/favs/InMemoryFavsDb';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const currTrack: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
    };
    TrackDb.addTrack(currTrack);
    return currTrack;
    return 'This action adds a new track';
  }

  findAll() {
    return TrackDb.getAllTrack();
    return `This action returns all track`;
  }

  findOne(id: string) {
    const currTrack: Track = TrackDb.getTrack(id);
    if (currTrack === undefined) return false;
    else return currTrack;
    return `This action returns a #${id} track`;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const currTrack: Track = TrackDb.getTrack(id);
    if (currTrack === undefined) return undefined;
    else {
      if (updateTrackDto.name) currTrack.name = updateTrackDto.name;
      if (updateTrackDto.duration) currTrack.duration = updateTrackDto.duration;
      if (updateTrackDto.artistId !== undefined)
        currTrack.artistId = updateTrackDto.artistId;
      if (updateTrackDto.albumId !== undefined)
        currTrack.albumId = updateTrackDto.albumId;
      TrackDb.updateTrack(currTrack);
      return currTrack;
    }
    return `This action updates a #${id} track`;
  }

  remove(id: string) {
    const currTrack: Track = TrackDb.getTrack(id);
    if (currTrack === undefined) return undefined;
    else {
      TrackDb.deleteTrack(id);
      FavsDb.remove('track', id);
      return true;
    }
  }
}
