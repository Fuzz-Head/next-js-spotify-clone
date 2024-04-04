import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
    constructor(private songService: SongsService) { }
    @Post()
    create(@Body() createSongDTO: CreateSongDTO) {
        return this.songService.create(createSongDTO);
    }
    @Get()
    findAll() {
        return 'find all songs';
    }
    @Get(':id')
    findOne(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
        )
        id: number,
    ) {
        return `fetch song based on ID ${typeof id}`;
    }
    @Put(':id')
    update() {
        return 'update song based on ID';
    }
    @Delete(':id')
    delete() {
        return 'delete song based on ID';
    }
}
