import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Fav {
    @PrimaryColumn()
    id: number;

    @Column("simple-array", {  nullable:true })
    artists: string[]; // favorite artists ids

    @Column("simple-array", {  nullable:true })
    albums: string[]; // favorite albums ids

    @Column("simple-array", {  nullable:true })
    tracks: string[]; // favorite tracks ids
}
