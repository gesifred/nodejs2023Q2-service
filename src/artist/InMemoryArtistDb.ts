//import { v4 as uuidv4 } from 'uuid';
//import { UpdateCatDto } from './dto/update-passwd.dto';

import { Artist } from "./interfaces/artist.interfaces";

class ArtistDb {
    private static readonly cats: Map<string, Artist> = new Map<string, Artist>();

    /*constructor() {
        Db.users = new Map<string, User>();
    }*/

    static getArtist(id: string): Artist | undefined {
        return ArtistDb.cats.get(id);
    }

    static addArtist(user: Artist): void {
        ArtistDb.cats.set(user.id, user);
    }

    static deleteArtist(id: string): boolean {
        return ArtistDb.cats.delete(id);
    }

    static updateArtist(user: Artist): boolean {
        //todo
        const record: Artist | undefined = ArtistDb.cats.get(user.id);
        if (record) {
            /*let el: string;
            for (el of Object.keys(user)) {
                record[el as keyof] = user[el as keyof User];
            }*/
            Object.assign(record, user);
            ArtistDb.cats.set(user.id, record);
            return true;
        }
        return false;
    }

    static getAllArtist(): Array<Artist> {
        const allUsers: Array<Artist> = [];
        for (const entry of ArtistDb.cats.entries()) {
            console.log("adding", entry[0], entry[1] as Artist);
            let cleanCat :Artist= {
                id: "", // uuid v4
                name: "",
                grammy: false,
            };
                Object.assign(cleanCat, entry[1]);
                allUsers.push(cleanCat);
            }
            return allUsers;
        }
    }

export default ArtistDb;