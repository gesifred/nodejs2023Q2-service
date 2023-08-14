import { AlbumInterface } from 'src/album/interfaces/album.interfaces';
import { ArtistInterface } from 'src/artist/interfaces/artist.interfaces';
import { TrackInterface } from 'src/track/interfaces/track.interfaces';

export interface Favs {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artists: ArtistInterface[];
  albums: AlbumInterface[];
  tracks: TrackInterface[];
}
