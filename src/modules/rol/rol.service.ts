import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { PaginationDto } from '@/common';
import { RolEntity } from './entities/rol.entity';

@Injectable()
export class RolService {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createRolDto: CreateRolDto) {
    const {nombre ,permisoIds } = createRolDto;
    return await this.prisma.rol.create({
      data: {
        nombre,
        permisos:{
          connect: permisoIds.map(id => ({ id })),
        }
      }
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const totalPages = await this.prisma.rol.count({
      where: { activo: true },
    });
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.prisma.rol.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { activo: true },
        select: RolEntity,
      }),
      meta: { total: totalPages, page, lastPage },
    };
  }

  async findOne(id: string) {
    const rol = await this.prisma.rol.findUnique({
      where: { id },
    });

    if (!rol) {
      throw new NotFoundException(`Rol with id #${id} not found`);
    }

    return rol;
  }

  async update(id: string, updateRolDto: UpdateRolDto) {
    const { nombre, permisoIds } = updateRolDto;
  
    await this.findOne(id);
  
    return this.prisma.rol.update({
      where: { id },
      data: {
        nombre,
        permisos: {
          set: permisoIds?.map(id => ({ id }))??[],
        },
      },
    });
  }
  

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.rol.update({
      where: { id },
      data: {
        activo: false,
      },
    });
  }
}
