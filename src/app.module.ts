import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { CloudinaryModule } from './common/cloudinary/cloudinary.module';
import { CloudinaryService } from './common/cloudinary/clodinary.service';
import { SucursalModule } from './modules/sucursal/sucursal.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { RolModule } from './modules/rol/rol.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { PermisoModule } from './modules/permiso/permiso.module';
import { RutaModule } from './modules/ruta/ruta.module';
import { ViajeModule } from './modules/viaje/viaje.module';
import { BusModule } from './modules/bus/bus.module';
import { TicketModule } from './modules/ticket/ticket.module';
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    SucursalModule,
    PermisoModule,
    RolModule,
    UsuarioModule,
    ClienteModule,
    RutaModule,
    ViajeModule,
    BusModule,
    TicketModule,
    CloudinaryModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    CloudinaryService,
  ],
  exports: [PrismaService],
})
export class AppModule {}
