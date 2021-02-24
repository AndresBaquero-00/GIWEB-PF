import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticiaService } from './noticia/noticia.service';
import { NoticiaController } from './noticia/noticia.controller';
import { NoticiaModule } from './noticia/noticia.module';
import { SharedService } from './shared/shared.service';

@Module({
  imports: [HttpModule, NoticiaModule],
  controllers: [AppController, NoticiaController],
  providers: [AppService, NoticiaService, SharedService],
})
export class AppModule {}
