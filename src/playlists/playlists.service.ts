import { Injectable } from '@nestjs/common';
import { CreatePlayListDto } from './dto/create-playlist.dto';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class PlaylistsService {
    constructor(
        @InjectRepository(Playlist)
        private playlistRepo: Repository<Playlist>,

        @InjectRepository(Song)
        private songsRepo: Repository<Song>,

        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    async create(playlistDTO: CreatePlayListDto): Promise<Playlist> {
        const playlist = new Playlist();
        playlist.name = playlistDTO.name;

        const songs = await this.songsRepo.findByIds(playlistDTO.songs);
        playlist.songs = songs;

        const user = await this.userRepo.findOneBy({ id: playlistDTO.user });
        playlist.user = user;

        return this.playlistRepo.save(playlist);
    }
}
