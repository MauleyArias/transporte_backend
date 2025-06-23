import { Module } from '@nestjs/common';
import { ViajeService } from './viaje.service';
import { ViajeController } from './viaje.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [ViajeController],
  providers: [ViajeService],
  imports: [PrismaModule],
})
export class ViajeModule { }
