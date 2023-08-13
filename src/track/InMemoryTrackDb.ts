import { TrackInterface } from './interfaces/track.interfaces';

class TrackDb {
  private static readonly cats: Map<string, TrackInterface> = new Map<string, TrackInterface>();

  /*constructor() {
        Db.users = new Map<string, User>();
    }*/

  static getTrack(id: string): TrackInterface | undefined {
    return TrackDb.cats.get(id);
  }

  static addTrack(user: TrackInterface): void {
    TrackDb.cats.set(user.id, user);
  }

  static deleteTrack(id: string): boolean {
    return TrackDb.cats.delete(id);
  }

  static updateTrack(user: TrackInterface): boolean {
    //todo
    const record: TrackInterface | undefined = TrackDb.cats.get(user.id);
    if (record) {
      Object.assign(record, user);
      TrackDb.cats.set(user.id, record);
      return true;
    }
    return false;
  }

  static getAllTrack(): Array<TrackInterface> {
    const allUsers: Array<TrackInterface> = [];
    for (const entry of TrackDb.cats.entries()) {
      console.log('adding', entry[0], entry[1] as TrackInterface);
      const cleanCat: TrackInterface = {
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
