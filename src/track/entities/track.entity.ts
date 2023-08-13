import { Album } from "../../album/entities/album.entity";
import { Artist } from "../../artist/entities/artist.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TrackInterface } from "../interfaces/track.interfaces";

@Entity()
export class Track implements TrackInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string; // uuid v4
  
  @Column({ length: 100, })
  name: string;
  
  @Column({ nullable: true })
  artistId: Artist |string | null

  @Column({ nullable: true })
  albumId: Album | string | null

  @ManyToOne(() => Artist,/* (artist) => artist.tracks,*/ { onDelete: "SET NULL", nullable: true })
  @JoinColumn()
  artist: Artist; // refers to Artist
  //artist: Artist;

  @ManyToOne(() => Album,/* (album) => album.tracks,*/ { onDelete: "SET NULL", nullable: true })
  @JoinColumn()
  album: Album; // refers to Album
  
  @Column({ })
  duration: number; // integer number

  @Column({ default: false, select: false })
  isFavorite: boolean
}
