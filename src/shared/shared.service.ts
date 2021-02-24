import { Injectable, HttpService } from '@nestjs/common';
import { Article } from 'src/interfaces/noticia';

const url = 'https://backend-562-default-rtdb.firebaseio.com/';
const coleccion = 'noticias';

@Injectable()
export class SharedService {
    constructor( private http: HttpService ){}

    guardar( noticia: Article[] ): Promise<Article>{
        return new Promise( resolve => {
            this.http.post(`${url}${coleccion}.json`, noticia).subscribe( data => {
                resolve( data.data );
            });
        });
    }
}
