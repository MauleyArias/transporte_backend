import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { PaginationDto } from '@/common';
import { ClienteEntity } from './entities/cliente.entity';

@Injectable()
export class ClienteService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createClienteDto: CreateClienteDto) {
    const { numeroDocumento, tipoDocumento, nombre, apellido, correo } = createClienteDto;
    const personaExiste = await this.prisma.persona.findUnique({
      where: {
        numeroDocumento,
      },
    });
    if (personaExiste) {
      throw new Error('El cliente ya existe');
    }
    return await this.prisma.persona.create({
      data: {
        numeroDocumento,
        tipoDocumento,
        nombre,
        apellido,
        correo,
        cliente: {
          create: {},
        },
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const totalPages = await this.prisma.persona.count({
      where: {
        activo: true,
        cliente: {
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
          cliente: {
            isNot: null,
          },
        },
        select: ClienteEntity,
      }),
      meta: { total: totalPages, page, lastPage },
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.persona.findUnique({
      where: {
        id,
        cliente: {
          isNot: null,
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`Cliente with id #${id} not found`);
    }

    return user;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    await this.findOne(id);
    const { numeroDocumento, tipoDocumento, nombre, apellido, correo } = updateClienteDto;

    return this.prisma.persona.update({
      where: {
        id,
        cliente: {
          isNot: null,
        },
      },
      data: {
        numeroDocumento,
        tipoDocumento,
        nombre,
        apellido,
        correo,
        cliente: {
          update: {
            where: { personaId: id },
            data: {},
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
        cliente: {
          isNot: null,
        },
      },
      data: {
        cliente: {
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
