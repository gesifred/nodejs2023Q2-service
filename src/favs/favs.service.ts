import { Injectable } from '@nestjs/common';
import ArtistDb from 'src/artist/InMemoryArtistDb';
import FavsDb from './InMemoryFavsDb';
import AlbumDb from 'src/album/InMemoryAlbumDb';
import TrackDb from 'src/track/InMemoryTrackDb';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Fav } from './entities/fav.entity';
import { FavoritesResponse } from './interfaces/favs.interfaces';
enum FavsAvailables {
  Artist = 'artist',
  Album = 'album',
  Track = 'track',
}
@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Fav)
    private readonly favRepository: Repository<Fav>
  ) { }

  async addArtist(name, id) {
    //const exists = ArtistDb.getArtist(id); //if true add artist // if false. return false
    const artist: Artist = await this.artistRepository.findOneBy({ id });
    if (artist == null) return false;
    artist.isFavorite = true;
    await this.artistRepository.save(artist);
    this.utilFav();
    return true;
    //return FavsDb.add(FavsAvailables.Artist, id);
  }
  async removeArtist(name: string, id: string) {
    const artist: Artist = await this.artistRepository.createQueryBuilder('artist')
      .select(['artist.id', 'artist.isFavorite', 'artist.name', 'artist.grammy'])
      .where('artist.id = :id', { id })
      .getOne();
    if (artist === null) return false;
    if (artist.isFavorite == false) return false;
    artist.isFavorite = false;
    await this.artistRepository.save(artist);
    this.utilFav();
    return true;
    //return FavsDb.remove(FavsAvailables.Artist, id); // true if removed // false if doesnt in favorite
  }
  async addAlbum(name, id) {
    //const exists = AlbumDb.getAlbum(id); //if true add artist // if false. return false
    const album: Album = await this.albumRepository.findOneBy({ id });
    if (album == null) return false;
    album.isFavorite = true;
    await this.albumRepository.save(album);
    this.utilFav();
    return true;
    //return FavsDb.add(FavsAvailables.Album, id);
  }
  async removeAlbum(name: string, id: string) {
    const album: Album = await this.albumRepository.createQueryBuilder('album')
      .select(['album.id', 'album.isFavorite', 'album.name', 'album.artistId'])
      .where('album.id = :id', { id })
      .getOne();
    if (album === null) return false;
    if (album.isFavorite == false) return false;
    album.isFavorite = false;
    await this.albumRepository.save(album);
    this.utilFav();
    return true;
    //return FavsDb.remove(FavsAvailables.Album, id); // true if removed // false if doesnt in favorite
  }
  async addTrack(name, id) {
    //const exists = TrackDb.getTrack(id); //if true add artist // if false. return false
    const track: Track = await this.trackRepository.findOneBy({ id });
    if (track == null) return false;
    track.isFavorite = true;
    await this.trackRepository.save(track);
    this.utilFav();
    return true;
    //return FavsDb.add(FavsAvailables.Track, id);
  }
  async removeTrack(name: string, id: string) {
    const track: Track = await this.trackRepository.createQueryBuilder('track')
      .select(['track.id', 'track.isFavorite', 'track.name', 'track.artistId', 'track.albumId'])
      .where('track.id = :id', { id })
      .getOne();
    //console.log(track)
    if (track === null) return false;
    if (track.isFavorite == false) return false;
    track.isFavorite = false;
    await this.trackRepository.save(track);
    this.utilFav();
    return true;
    //return FavsDb.remove(FavsAvailables.Track, id); // true if removed // false if doesnt in favorite
  }

  async findAll() : Promise<FavoritesResponse>{
    const artists = await this.artistRepository.find({
      where: { isFavorite: true },
    });
    let artistsArray: Artist[] = [];
    for (let i = 0; i < artists.length; i++) {
      artistsArray.push(artists[i]);
    }
    const albums = await this.albumRepository.find({
      where: { isFavorite: true },
    });
    let albumsArray: Album[] = [];
    for (let i = 0; i < albums.length; i++) {
      albumsArray.push(albums[i]);
    }
    const tracks = await this.trackRepository.find({
      where: { isFavorite: true },
    });
    let tracksArray: Track[] = [];
    for (let i = 0; i < tracks.length; i++) {
      tracksArray.push(tracks[i]);
    }
    return {
      artists: artistsArray,
      albums: albumsArray,
      tracks: tracksArray
    }
    //return FavsDb.getAll();
  }

  async utilFav(){
    const favs = await this.findAll();
    const artistArray = [];
    const albumArray = [];
    const trackArray = [];
    favs.artists.forEach(artist => {
      artistArray.push(artist.id);
    })
    favs.albums.forEach(album => {
      albumArray.push(album.id);
    })
    favs.tracks.forEach(track => {
      trackArray.push(track.id);
    })
    this.favRepository.save({id:1, artists:artistArray, albums:albumArray, tracks:trackArray});
  }
}
