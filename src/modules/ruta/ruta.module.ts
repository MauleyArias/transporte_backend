import { Module } from '@nestjs/common';
import { RutaService } from './ruta.service';
import { RutaController } from './ruta.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [RutaController],
  providers: [RutaService],
  imports: [PrismaModule],
})
export class RutaModule { }
