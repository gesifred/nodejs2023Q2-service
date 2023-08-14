import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';
import { ArtistInterface } from '../interfaces/artist.interfaces';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Artist implements ArtistInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ length: 100 })
  name: string;

  @Column({})
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artistId)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artistId)
  tracks: Track[];

  @Column({ default: false, select: false })
  isFavorite: boolean;
}
