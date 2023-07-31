//import { v4 as uuidv4 } from 'uuid';
//import { UpdateCatDto } from './dto/update-passwd.dto';

import { Artist } from "src/artist/interfaces/artist.interfaces";
import { FavoritesResponse, Favs } from "./interfaces/favs.interfaces";
import { Album } from "src/album/interfaces/album.interfaces";
import { Track } from "src/track/interfaces/track.interfaces";
import ArtistDb from "src/artist/InMemoryArtistDb";
import AlbumDb from "src/album/InMemoryAlbumDb";
import TrackDb from "src/track/InMemoryTrackDb";

class FavsDb {
    //private static readonly cats: Map<string, Favs> = new Map<string, Favs>();
    private static readonly favs: Favs = {
        artists: [],
        albums: [],
        tracks: []
    }
    static add(name: string, id: string) {
        name += "s";
        const idx = this.favs[name].indexOf(id);
        if (idx < 0) {
            this.favs[name].push(id); //only if is not already in favs
            console.log(id, " added");
        }
        return true;// added to favs
        //it does not evaluate if already in DB
    }
    static remove(name: string, id: string) {
        name += "s";
        const idx = this.favs[name].indexOf(id);
        if (idx >= 0) {
            console.log(this.favs[name].splice(idx, 1), " removed");
            return true; // in favs and removed
        } else {
            return false //not in favs
        }
    }
    static getAll(): FavoritesResponse {
        const artists: Artist[] = [];
        const albums: Album[] = [];
        const tracks: Track[] = [];
        this.favs.artists.forEach(id => {
            let artistEntity: Artist = ArtistDb.getArtist(id);
            if (artistEntity !== undefined) artists.push(artistEntity);
        })
        this.favs.albums.forEach(id => {
            let albumEntity: Album = AlbumDb.getAlbum(id);
            if (albumEntity !== undefined) albums.push(albumEntity);
        })
        this.favs.tracks.forEach(id => {
            let trackEntity: Track = TrackDb.getTrack(id);
            if (trackEntity !== undefined) tracks.push(trackEntity);
        })
        return {
            artists: artists,
            albums: albums,
            tracks: tracks
        }
    }
    /*
        static getFavs(id: string): Favs | undefined {
            return FavsDb.cats.get(id);
        }
    
        static addFavs(user: Favs): void {
            FavsDb.cats.set(user.id, user);
        }
    
        static deleteFavs(id: string): boolean {
            return FavsDb.cats.delete(id);
        }
    
        static updateFavs(user: Favs): boolean {
            //todo
            const record: Favs | undefined = FavsDb.cats.get(user.id);
            if (record) {
                Object.assign(record, user);
                FavsDb.cats.set(user.id, record);
                return true;
            }
            return false;
        }
    
        static getAllFavs(): Array<Favs> {
            const allUsers: Array<Favs> = [];
            for (const entry of FavsDb.cats.entries()) {
                console.log("adding", entry[0], entry[1] as Favs);
                let cleanCat: Favs = {
                    id: "", // uuid v4
                    name: "",
                    year: 0,
                    artistId: null,
                };
                Object.assign(cleanCat, entry[1]);
                allUsers.push(cleanCat);
            }
            return allUsers;
        }*/
}

export default FavsDb;