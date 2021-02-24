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
        const filtro: Array<Article> = [];
        let noticias: TopLevel;

        for(let i = 1; i <= 5; i++){
            noticias = await this.noticiaService.getEverything(q, i);
            filtro.push(...noticias.articles.filter( noticia => {
                if( !noticia.author ){
                    noticia.author = 'Pepita Perez';
                    return noticia;
                }else if(noticia.author == author)
                    return noticia;
                
                if( !noticia.source.name || !noticia.source.id ){
                    noticia.source.id = 'Sacado de cualquier lugar del mundo'
                    noticia.source.name = 'Sacado de cualquier lugar del mundo'
                    return noticia;
                }else if( noticia.source.name == source )
                    return noticia
            }));
        }

        this.guardar( filtro );

        if( filtro.length === 0 ){
            return noticias
        }

        return filtro;
    }

    async guardar( noticia: Article[] ){
        await this.fireService.guardar( noticia );
    }
}
