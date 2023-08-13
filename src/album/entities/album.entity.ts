import { Artist } from "../../artist/entities/artist.entity";
import { Track } from "../../track/entities/track.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AlbumInterface } from "../interfaces/album.interfaces";
@Entity()
export class Album implements AlbumInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string; // uuid v4

  @Column({ length: 100, })
  name: string;

  @Column()
  year: number;
  
  @Column({ nullable: true })
  artistId: Artist | string | null

  @ManyToOne(() => Artist/*, (artistId) => artistId.albums*/, { onDelete: "SET NULL", nullable: true })
  @JoinColumn()
  artist: Artist//: Artist | null;
  //@JoinColumn()
  //artist: Artist

  /*@Column({ default: false, select: true })
  isFavorite: boolean*/

  @OneToMany(() => Track, (track) => track.albumId)
  tracks: Track[]

}
