import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

export interface TrackInterface {
  id: string; // uuid v4
  name: string;
  artistId: Artist | string | null; // refers to Artist
  albumId: Album | string | null; // refers to Album
  duration: number; // integer number
}
