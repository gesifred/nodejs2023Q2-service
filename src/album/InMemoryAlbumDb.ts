import { AlbumInterface } from './interfaces/album.interfaces';

class AlbumDb {
  private static readonly cats: Map<string, AlbumInterface> = new Map<string, AlbumInterface>();

  /*constructor() {
        Db.users = new Map<string, User>();
    }*/

  static getAlbum(id: string): AlbumInterface | undefined {
    return AlbumDb.cats.get(id);
  }

  static addAlbum(user: AlbumInterface): void {
    AlbumDb.cats.set(user.id, user);
  }

  static deleteAlbum(id: string): boolean {
    return AlbumDb.cats.delete(id);
  }

  static updateAlbum(user: AlbumInterface): boolean {
    //todo
    const record: AlbumInterface | undefined = AlbumDb.cats.get(user.id);
    if (record) {
      Object.assign(record, user);
      AlbumDb.cats.set(user.id, record);
      return true;
    }
    return false;
  }

  static getAllAlbum(): Array<AlbumInterface> {
    const allUsers: Array<AlbumInterface> = [];
    for (const entry of AlbumDb.cats.entries()) {
      console.log('adding', entry[0], entry[1] as AlbumInterface);
      const cleanCat: AlbumInterface = {
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
