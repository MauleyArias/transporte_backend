import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CrearAuthDto } from './dto/create-auth.dto';
import { RequestInfo } from '@/decorator';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RolEntity } from '../rol/entities/rol.entity';
import { SucursalEntity } from '../sucursal/entities/sucursal.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  signJWT(payload: any, expiresIn?: string | number) {
    if (expiresIn) return this.jwtService.sign(payload, { expiresIn });
    return this.jwtService.sign(payload);
  }

  async login(crearAuthDto: CrearAuthDto, requestInfo: RequestInfo) {
    const { correo, contrasenia } = crearAuthDto;
    const { userAgent, ipAddress } = requestInfo;

    try {
      const persona = await this.prisma.persona.findFirst({
        where: {
          correo,
        },
        select: {
          id: true,
          nombre: true,
          apellido: true,
          correo: true,
          activo: true,
          usuario: {
            select: {
              password: true,
              rol: {
                select: RolEntity,
              },
              sucursales: {
                select: SucursalEntity,
              },
            }
          },
        },
      });

      if (!persona || !persona.activo || !persona.usuario) {
        throw new NotFoundException('Las credenciales no son válidas, por favor verifica tu correo y contraseña');
      }

      const isPasswordValid = bcrypt.compareSync(contrasenia, persona.usuario.password);
      if (!isPasswordValid) {
        throw new NotFoundException('Las credenciales no son válidas, por favor verifica tu correo y contraseña');
      }

      const { usuario } = persona;

      const tokenPayload = {
        id: persona.id,
        nombre: persona.nombre,
        apellido: persona.apellido,
        correo: persona.correo,
      };

      const token = this.signJWT(tokenPayload);
      const refreshToken = this.signJWT(tokenPayload, '1d');

      await this.prisma.sesion.create({
        data: {
          personaId: persona.id,
          token,
          direccionIp: ipAddress,
          agenteUsuario: userAgent,
        },
      });

      return {
        ...tokenPayload,
        token,
        refreshToken,
        rol: usuario.rol,
        sucursales: usuario.sucursales,
      };

    } catch (error) {
      console.error('Login error:', error);
      throw new InternalServerErrorException('Internal error');
    }
  }

}
