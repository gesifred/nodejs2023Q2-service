//import { v4 as uuidv4 } from 'uuid';
//import { UpdateCatDto } from './dto/update-passwd.dto';

import { Track } from './interfaces/track.interfaces';

class TrackDb {
  private static readonly cats: Map<string, Track> = new Map<string, Track>();

  /*constructor() {
        Db.users = new Map<string, User>();
    }*/

  static getTrack(id: string): Track | undefined {
    return TrackDb.cats.get(id);
  }

  static addTrack(user: Track): void {
    TrackDb.cats.set(user.id, user);
  }

  static deleteTrack(id: string): boolean {
    return TrackDb.cats.delete(id);
  }

  static updateTrack(user: Track): boolean {
    //todo
    const record: Track | undefined = TrackDb.cats.get(user.id);
    if (record) {
      Object.assign(record, user);
      TrackDb.cats.set(user.id, record);
      return true;
    }
    return false;
  }

  static getAllTrack(): Array<Track> {
    const allUsers: Array<Track> = [];
    for (const entry of TrackDb.cats.entries()) {
      console.log('adding', entry[0], entry[1] as Track);
      const cleanCat: Track = {
        id: '', // uuid v4
        name: '',
        duration: 0,
        artistId: null,
        albumId: null,
      };
      Object.assign(cleanCat, entry[1]);
      allUsers.push(cleanCat);
    }
    return allUsers;
  }
}

export default TrackDb;
