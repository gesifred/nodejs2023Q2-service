import { Artist } from "src/artist/entities/artist.entity";

export interface AlbumInterface {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: Artist | null | string;
}
