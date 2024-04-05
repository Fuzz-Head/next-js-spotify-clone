import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Song } from './song.entity';
import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/artists/artist.entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-songs-dto';


@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private songsRepository: Repository<Song>,
        @InjectRepository(Artist)
        private artistsRepository: Repository<Artist>,
    ) { }

    async create(songDTO: CreateSongDTO): Promise<Song> {
        const song = new Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists;
        song.duration = songDTO.duration;
        song.lyrics = songDTO.lyrics;
        song.releaseDate = songDTO.releaseDate;

        console.log(songDTO.artists);

        const artists = await this.artistsRepository.findByIds(songDTO.artists);
        console.log(artists);

        song.artists = artists;

        return this.songsRepository.save(song);

    }

    findAll(): Promise<Song[]> {
        return this.songsRepository.find();
    }

    findOne(id: number): Promise<Song> {
        return this.songsRepository.findOneBy({ id });
    }

    remove(id: number): Promise<DeleteResult> {
        return this.songsRepository.delete(id);
    }

    update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
        return this.songsRepository.update(id, recordToUpdate);
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        const queryBuilder = this.songsRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.releaseDate', 'DESC');

        return paginate<Song>(queryBuilder, options);
    }
}
