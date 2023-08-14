import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fav } from './entities/fav.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fav]), AlbumModule, ArtistModule, TrackModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule { }
