import { Injectable, HttpService } from '@nestjs/common';
import { TopLevel } from 'src/interfaces/noticia';

const url = 'http://newsapi.org/v2/';
const apiKey = '25ac0238d8bf4f58a648cbb1df6b43e5';

@Injectable()
export class NoticiaService {
  constructor( private http: HttpService ){}

  getEverything( q: string, page: number ){
    return this.obtener<TopLevel>( `${ url }everything?q=${ q }&page=${ page }&apiKey=${ apiKey }` );
  }

  private obtener<T>( query: string ): Promise<T>{
    return new Promise( resolve => {
      this.http.get( query ).subscribe( data => {
        resolve( data.data );
      });
    });
  }
}
