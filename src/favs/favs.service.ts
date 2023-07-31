import { Injectable } from '@nestjs/common';
import ArtistDb from 'src/artist/InMemoryArtistDb';
import FavsDb from './InMemoryFavsDb';
import AlbumDb from 'src/album/InMemoryAlbumDb';
import TrackDb from 'src/track/InMemoryTrackDb';
enum FavsAvailables {
  Artist = 'artist',
  Album = 'album',
  Track = 'track',
}
@Injectable()
export class FavsService {
  addArtist(name, id) {
    const exists = ArtistDb.getArtist(id); //if true add artist // if false. return false
    if (exists === undefined) return false;
    return FavsDb.add(FavsAvailables.Artist, id);
  }
  removeArtist(name: string, id: string) {
    return FavsDb.remove(FavsAvailables.Artist, id); // true if removed // false if doesnt in favorite
  }
  addAlbum(name, id) {
    const exists = AlbumDb.getAlbum(id); //if true add artist // if false. return false
    if (exists === undefined) return false;
    return FavsDb.add(FavsAvailables.Album, id);
  }
  removeAlbum(name: string, id: string) {
    return FavsDb.remove(FavsAvailables.Album, id); // true if removed // false if doesnt in favorite
  }
  addTrack(name, id) {
    const exists = TrackDb.getTrack(id); //if true add artist // if false. return false
    if (exists === undefined) return false;
    return FavsDb.add(FavsAvailables.Track, id);
  }
  removeTrack(name: string, id: string) {
    return FavsDb.remove(FavsAvailables.Track, id); // true if removed // false if doesnt in favorite
  }

  findAll() {
    return FavsDb.getAll();
    return `This action returns all favs`;
  }
  /*
    findOne(id: number) {
      return `This action returns a #${id} fav`;
    }
  
    update(id: number, updateFavDto: UpdateFavDto) {
      return `This action updates a #${id} fav`;
    }
  
    remove(id: number) {
      return `This action removes a #${id} fav`;
    }*/
}
