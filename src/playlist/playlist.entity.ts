import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('playlists')
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    //each playlist have multiple songs 

    @OneToMany(() => Song, (song) => song.playlist)
    songs: Song[];


    //many playlists can belong to single user

    @ManyToOne(() => User, (user) => user.playlists)
    user: User;

}