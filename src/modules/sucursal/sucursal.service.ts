import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { PaginationDto } from '@/common';
import { SucursalEntity } from './entities/sucursal.entity';

@Injectable()
export class SucursalService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createSucursalDto: CreateSucursalDto) {
    return await this.prisma.sucursal.create({
      data: {
        ...createSucursalDto
      }
    });
    }

    async findAll(paginationDto: PaginationDto) {
      const { page = 1, limit = 10 } = paginationDto;
      const totalPages = await this.prisma.sucursal.count({
        where: { activo: true },
      });
      const lastPage = Math.ceil(totalPages / limit);
  
      return {
        data: await this.prisma.sucursal.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: { activo: true },
          select: SucursalEntity
        }),
        meta: { total: totalPages, page, lastPage },
      };
    }

    async findOne(id: string) {
      const sucursal = await this.prisma.sucursal.findUnique({
        where: { id },
      });
  
      if (!sucursal) {
        throw new NotFoundException(`Sucursal with id #${id} not found`);
      }
  
      return sucursal;
    }

  async update(id: string, updateSucursalDto: UpdateSucursalDto) {
    await this.findOne(id);

    return this.prisma.sucursal.update({
      where: { id },
      data: updateSucursalDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.sucursal.update({
      where: { id },
      data: {
        activo: false,
      },
    });
  }
}
