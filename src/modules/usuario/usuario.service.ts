import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '@/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from '@/common';
import { UsuarioEntity } from './entities/usuario.entity';
@Injectable()
export class UsuarioService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { numeroDocumento, tipoDocumento, rolId, sucursalesIds, nombre, apellido, correo } =
      createUsuarioDto;

    const personaExiste = await this.prisma.persona.findUnique({
      where: { numeroDocumento },
    });

    if (personaExiste) {
      throw new Error('El usuario ya existe');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(correo, salt);

    return await this.prisma.persona.create({
      data: {
        numeroDocumento,
        tipoDocumento,
        nombre,
        apellido,
        correo,
        usuario: {
          create: {
            password: hashedPassword,
            rolId: rolId,
            sucursales: {
              connect: sucursalesIds.map(id => ({ id })),
            }
          },
        },
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const totalPages = await this.prisma.persona.count({
      where: {
        activo: true,
        usuario: {
          isNot: null,
        },
      },
    });
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.prisma.persona.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          activo: true,
          usuario: {
            isNot: null,
          },
        },
        select: UsuarioEntity,
      }),
      meta: { total: totalPages, page, lastPage },
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.persona.findUnique({
      where: {
        id,
        usuario: {
          isNot: null,
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuario with id #${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id);
    const { numeroDocumento, tipoDocumento, rolId, sucursalesIds, nombre, apellido, correo } = updateUsuarioDto;

    return this.prisma.persona.update({
      where: {
        id,
        usuario: {
          isNot: null,
        },
      },
      data: {
        numeroDocumento,
        tipoDocumento,
        nombre,
        apellido,
        correo,
        usuario: {
          update: {
            where: { personaId: id },
            data: {
              rolId,
              sucursales: {
                set: sucursalesIds?.map(id => ({ id })) ?? [],
              },
            },
          },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.persona.update({
      where: {
        id,
        usuario: {
          isNot: null,
        },
      },
      data: {
        usuario: {
          update: {
            where: { personaId: id },
            data: {
              activo: false,
            },
          },
        },
      },
    });
  }
}