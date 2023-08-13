import { Album } from "./album/entities/album.entity";
import { Artist } from "./artist/entities/artist.entity";
import { Track } from "./track/entities/track.entity";
import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
//import "reflect-metadata";
config();
const configService = new ConfigService();

const configOrm = {
  type: configService.get('APP_DB_TYPE') || 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT') || 5432,
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [Artist, Album, Track],
  migrations: ["./src/migrations/*{.ts,.js}"],
  autoLoadEntities: true,
  synchronize: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
}
const Ds = new DataSource(configOrm as DataSourceOptions);

export default Ds;
export {configOrm as configOrm};