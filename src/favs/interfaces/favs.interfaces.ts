import { Album } from "src/album/interfaces/album.interfaces";
import { Artist } from "src/artist/interfaces/artist.interfaces";
import { Track } from "src/track/interfaces/track.interfaces";

export interface Favs {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse{
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
  }