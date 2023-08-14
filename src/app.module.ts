import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOrm } from './DatasourceTypeorm';

//cause gives error on migrations dependencies when nest is loaded
//nest parses migrations files, that is not required by the app itself
delete configOrm.migrations;
delete configOrm.cli;

@Module({
  imports: [
    UserModule,
    AlbumModule,
    ArtistModule,
    TrackModule,
    FavsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configOrm),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
