import { Controller, Get, Query } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { NoticiaService } from './noticia.service';
import { Article, TopLevel } from '../interfaces/noticia';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Noticias')
@Controller('noticia')
export class NoticiaController {

    i = 0;

    constructor( private readonly noticiaService: NoticiaService,
                 private readonly fireService: SharedService ){}
    
    @ApiQuery({
        name: 'author',
        required: false,
    })  
    @ApiQuery({
        name: 'source',
        required: false,
    })             
    @Get('/about')
    async getEverything( @Query('q') q: string, @Query('author') author: string, @Query('source') source: string ){
        const noticias: Array<Article> = [];

        for(let i = 1; i <= 5; i++){
            const n = await this.noticiaService.getEverything(q, author, source, i);
            noticias.push( ...n )
        }

        this.guardar( noticias );
        return noticias;
    }

    async guardar( noticia: Article[] ){
        await this.fireService.guardar( noticia );
    }
}
