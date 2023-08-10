import { Album } from "../../album/entities/album.entity";
import { Artist } from "../../artist/entities/artist.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Track implements Track {
  @PrimaryGeneratedColumn("uuid")
  id: string; // uuid v4
  
  @Column({ length: 100, })
  name: string;

  @ManyToOne(() => Artist, (artistId) => artistId.tracks, { onDelete: "SET NULL", nullable: true })
  artistId: string | null; // refers to Artist

  @ManyToOne(() => Album, (albumId) => albumId.tracks, { onDelete: "SET NULL", nullable: true })
  albumId: string | null; // refers to Album

  @Column({ })
  duration: number; // integer number
}
