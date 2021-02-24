import { HttpModule, Module } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { NoticiaController } from './noticia.controller';
import { NoticiaService } from './noticia.service';

@Module({
    imports: [HttpModule],
    controllers: [NoticiaController],
    providers: [NoticiaService, SharedService]
})
export class NoticiaModule {}
