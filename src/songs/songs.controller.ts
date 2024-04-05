import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpStatus, Query, DefaultValuePipe } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Song } from './song.entity';
import { UpdateSongDto } from './dto/update-songs-dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('songs')
export class SongsController {
    constructor(private songService: SongsService) { }
    @Post()
    create(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
        return this.songService.create(createSongDTO);
    }
    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe)
        page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
        limit = 10,
    ): Promise<Pagination<Song>> {
        limit = limit > 100 ? 100 : limit;
        return this.songService.paginame({
            page,
            limit,
        });
    }

    @Get(':id')
    findOne(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
        )
        id: number,
    ): Promise<Song> {
        return this.songService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() UpdateSongDto: UpdateSongDto,
    ): Promise<UpdateResult> {
        return this.songService.update(id, UpdateSongDto);
    }
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.songService.remove(id);
    }
}
