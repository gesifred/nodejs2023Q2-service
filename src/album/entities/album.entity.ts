import { Artist } from "../../artist/entities/artist.entity";
import { Track } from "../../track/entities/track.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Album implements Album {
  @PrimaryGeneratedColumn("uuid")
  id: string; // uuid v4

  @Column({ length: 100, })
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (artistId) => artistId.albums, { onDelete: "SET NULL", nullable: true })
  artistId: string | null;

  @Column({ default: false, select: true })
  isFavorite: boolean

  @OneToMany(() => Track, (track) => track.albumId)
  tracks: Track[]

}
