//import { v4 as uuidv4 } from 'uuid';
//import { UpdateCatDto } from './dto/update-passwd.dto';

import { Album } from './interfaces/album.interfaces';

class AlbumDb {
  private static readonly cats: Map<string, Album> = new Map<string, Album>();

  /*constructor() {
        Db.users = new Map<string, User>();
    }*/

  static getAlbum(id: string): Album | undefined {
    return AlbumDb.cats.get(id);
  }

  static addAlbum(user: Album): void {
    AlbumDb.cats.set(user.id, user);
  }

  static deleteAlbum(id: string): boolean {
    return AlbumDb.cats.delete(id);
  }

  static updateAlbum(user: Album): boolean {
    //todo
    const record: Album | undefined = AlbumDb.cats.get(user.id);
    if (record) {
      Object.assign(record, user);
      AlbumDb.cats.set(user.id, record);
      return true;
    }
    return false;
  }

  static getAllAlbum(): Array<Album> {
    const allUsers: Array<Album> = [];
    for (const entry of AlbumDb.cats.entries()) {
      console.log('adding', entry[0], entry[1] as Album);
      const cleanCat: Album = {
        id: '', // uuid v4
        name: '',
        year: 0,
        artistId: null,
      };
      Object.assign(cleanCat, entry[1]);
      allUsers.push(cleanCat);
    }
    return allUsers;
  }
}

export default AlbumDb;
