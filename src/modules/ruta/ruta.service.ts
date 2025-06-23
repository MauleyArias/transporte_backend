import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { PaginationDto } from '@/common';

@Injectable()
export class RutaService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createRutaDto: CreateRutaDto) {
    return await this.prisma.ruta.create({
      data: {
        ...createRutaDto
      }
    });
    }

    async findAll(paginationDto: PaginationDto) {
      const { page = 1, limit = 10 } = paginationDto;
      const totalPages = await this.prisma.ruta.count({
        where: { activo: true },
      });
      const lastPage = Math.ceil(totalPages / limit);
  
      return {
        data: await this.prisma.ruta.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: { activo: true },
        }),
        meta: { total: totalPages, page, lastPage },
      };
    }

    async findOne(id: string) {
      const ruta = await this.prisma.ruta.findUnique({
        where: { id },
      });
  
      if (!ruta) {
        throw new NotFoundException(`Ruta with id #${id} not found`);
      }
  
      return ruta;
    }

  async update(id: string, updateRutaDto: UpdateRutaDto) {
    await this.findOne(id);

    return this.prisma.ruta.update({
      where: { id },
      data: updateRutaDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.ruta.update({
      where: { id },
      data: {
        activo: false,
      },
    });
  }
}
