import { Injectable, HttpService } from '@nestjs/common';
import { TopLevel } from 'src/interfaces/noticia';

const url = 'http://newsapi.org/v2/';
const apiKey = '25ac0238d8bf4f58a648cbb1df6b43e5';

@Injectable()
export class NoticiaService {
  constructor( private http: HttpService ){}

  async getEverything( q: string, author: string, source: string, page: number ){
    const top = await this.obtener<TopLevel>( `${ url }everything?q=${ q }&page=${ page }&apiKey=${ apiKey }` );
    const noticias = top.articles.map( noticia => {
      if( !noticia.author ){
        noticia.author = 'Pepita Perez';
        return noticia;
      }
      if(noticia.author == author)
          return noticia;
      
      if( !noticia.source.name || !noticia.source.id ){
          noticia.source.id = 'Sacado de cualquier lugar del mundo'
          noticia.source.name = 'Sacado de cualquier lugar del mundo'
          return noticia;
      }
      if( noticia.source.name == source )
          return noticia
    });

    if( noticias.length === 0 )
      return top.articles;

    return noticias;
  }

  private obtener<T>( query: string ): Promise<T>{
    return new Promise( resolve => {
      this.http.get<T>( query ).subscribe( (data) => {
        resolve( data.data );
      });
    });
  }
}
